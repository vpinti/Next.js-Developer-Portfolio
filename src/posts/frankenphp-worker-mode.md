---
title: "FrankenPHP & Worker Mode: Making Legacy PHP Fast"
date: "November 12, 2025"
coverImage: "/images/articles/frankenphp-worker-mode.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "PHP has a reputation for being slow to boot on every request. FrankenPHP and worker mode change that story — here is what they are and when they are worth it."
category: "PHP"
tags: ["PHP", "FrankenPHP", "Performance", "DevOps"]
---

For years, the mental model of a PHP application was simple: a request comes in, PHP boots up, runs your code, sends a response, and then throws everything away. The next request starts from zero. This "share nothing" model is easy to reason about and hard to leak memory with, but it also means you pay a startup cost on **every single request**.

FrankenPHP is one of the projects trying to change that — without forcing you to rewrite your application. Let's look at what it actually does and when it makes sense.

## Table of contents

1. [The classic setup, briefly](#the-classic-setup-briefly)
2. [What FrankenPHP is](#what-frankenphp-is)
3. [Worker mode: boot once, serve many](#worker-mode-boot-once-serve-many)
4. [The catch: state now leaks between requests](#the-catch-state-now-leaks-between-requests)
5. [When is it worth it?](#when-is-it-worth-it)
6. [Takeaways](#takeaways)

## The classic setup, briefly

A traditional PHP stack looks like this: a web server (Nginx or Apache) talks to **PHP-FPM**, a process manager that keeps a pool of PHP workers ready. For each request, FPM hands the work to a worker, the worker bootstraps your framework (autoloading, config, service container, routes), runs the request, and tears it all down.

That bootstrap is the hidden tax. On a small script it's nothing. On a full framework like Laravel or Symfony — or a large legacy app — rebuilding the whole world on every request adds up.

## What FrankenPHP is

FrankenPHP is a modern application server for PHP, built on top of the Caddy web server. In practice it gives you two things:

1. **A single binary** that serves your PHP app directly — no separate Nginx + PHP-FPM to wire together. It also brings HTTPS, HTTP/2 and HTTP/3 out of the box.
2. **Worker mode** — the feature that actually moves the performance needle.

You can adopt point 1 without changing your code at all: FrankenPHP can run a normal PHP app exactly like FPM would. That alone simplifies your deployment. The interesting part is worker mode.

## Worker mode: boot once, serve many

The idea behind worker mode is straightforward. Instead of bootstrapping your framework on every request, you bootstrap it **once**, keep it in memory, and then loop: wait for a request, handle it, wait for the next one.

Conceptually, a worker script looks like this:

```php
<?php
// This runs ONCE, when the worker starts
require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php'; // expensive setup

// This loop runs for EACH request, reusing $app
$handler = static function () use ($app) {
    $request = // build request from globals
    $response = $app->handle($request);
    $response->send();
};

// FrankenPHP feeds requests into the handler
$maxRequests = (int) ($_SERVER['MAX_REQUESTS'] ?? 0);
for ($i = 0; !$maxRequests || $i < $maxRequests; $i++) {
    $keepRunning = \frankenphp_handle_request($handler);
    if (!$keepRunning) {
        break;
    }
}
```

The expensive part — autoloading, reading config, building the container — happens before the loop. Inside the loop you only do the per-request work. For a heavy framework this can cut response times dramatically, because you've deleted the repeated bootstrap.

Most frameworks already ship an integration so you don't hand-write this. Laravel has Octane (which supports FrankenPHP as a backend), and Symfony has a runtime component. You usually just install a package and point the server at it.

## The catch: state now leaks between requests

There is no free lunch. The whole point of the classic model was that each request starts clean. In worker mode, **the process lives across many requests**, so anything you leave lying around sticks around too.

Two things to watch:

- **Global and static state.** A static variable, a singleton holding request-specific data, or a global you mutate will carry over to the next visitor. That can leak one user's data into another user's response — a real bug, not just a performance issue.
- **Memory growth.** Small leaks that never mattered in a short-lived request now accumulate. This is why the loop above respects a `MAX_REQUESTS` limit: workers are recycled periodically so any slow leak gets reset.

The practical rule: your per-request code must not depend on, or pollute, long-lived state. Well-structured apps that already lean on dependency injection tend to adapt easily. Older code full of globals needs more care.

## When is it worth it?

Worker mode shines when **bootstrap cost dominates** — big frameworks, lots of service wiring, high request volume. If your app is a thin script that barely boots anything, the gain is small.

A sensible way to decide:

1. Measure first. Look at how much of your response time is framework bootstrap versus actual work (a profiler or even simple timers will tell you).
2. Try FrankenPHP in plain mode first — you get the simpler single-binary deployment and HTTP/3 with zero code changes.
3. Move to worker mode once you're confident about your app's state handling, and load-test it before shipping.

## Takeaways

- The traditional PHP model rebuilds everything on every request; that bootstrap is a real cost at scale.
- FrankenPHP gives you a single-binary server (easy win) and worker mode (the big performance win).
- Worker mode keeps your app booted in memory and loops over requests — fast, but it breaks the "clean slate" assumption.
- Audit global/static state and recycle workers to stay safe.

You don't have to rewrite anything to start. Run your existing app on FrankenPHP in plain mode, measure, and reach for worker mode when the numbers say it's worth it.
