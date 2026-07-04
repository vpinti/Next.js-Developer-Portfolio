---
title: "Understanding PHP Fibers and Coroutines"
date: "February 20, 2026"
coverImage: "/images/articles/php-coroutines-and-fibers.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "PHP 8.1 introduced Fibers for coroutines and cooperative concurrency. Learn what PHP Fibers are, how they work, and when to use them."
category: "PHP"
tags: ["PHP", "Fibers", "Async", "Concurrency"]
---

PHP has a reputation for being strictly "one thing at a time": a request comes in, your code runs top to bottom, and while it waits for the database or an HTTP call, it just... waits. PHP 8.1 quietly added a feature that changes what's possible here: **PHP Fibers**. They are the foundation for coroutines and cooperative concurrency in PHP.

Fibers are a low-level tool, and most developers will use them through a library rather than directly. But understanding what they are makes a lot of modern async PHP click into place.

## Table of contents

1. [Blocking vs non-blocking, quickly](#blocking-vs-non-blocking-quickly)
2. [What a PHP Fiber actually is](#what-a-php-fiber-actually-is)
3. [A tiny Fiber example](#a-tiny-fiber-example)
4. [Fibers vs threads vs async](#fibers-vs-threads-vs-async)
5. [When you actually need this](#when-you-actually-need-this)

## Blocking vs non-blocking, quickly

When your code calls a database or an external API, most of the time is spent *waiting* for the answer. In normal PHP, that wait is "blocking": nothing else can happen on that process until the answer arrives.

If you need to make ten independent API calls, blocking code does them one after another — ten waits in a row. What if the process could start the next call while waiting for the first? That's the problem concurrency solves.

## What a PHP Fiber actually is

A Fiber is a block of code that can **pause itself** and hand control back to the caller, then **resume later** exactly where it left off. That's the whole idea.

Think of reading a book with a bookmark. You can stop at any page, go do something else, and later open back to the exact page and continue. A Fiber is that bookmark for running code.

Crucially, this is *cooperative*: the Fiber decides when to pause (it "yields"). Nothing interrupts it by force. That makes the behavior predictable and avoids many of the classic pitfalls of threads.

## A tiny Fiber example

```php
$fiber = new Fiber(function (): void {
    echo "start\n";
    $value = Fiber::suspend('paused here');  // hand control back
    echo "resumed with: $value\n";
});

$signal = $fiber->start();      // prints "start", returns 'paused here'
echo "fiber said: $signal\n";

$fiber->resume('hello again');  // prints "resumed with: hello again"
```

Running this prints:

```
start
fiber said: paused here
resumed with: hello again
```

Notice how execution jumped *out* of the fiber at `suspend`, ran the outer code, then jumped back *in* at `resume`. That pause-and-resume ability is everything you need to build cooperative concurrency.

## Fibers vs threads vs async

It helps to compare three ideas people often confuse:

- **Threads** run code truly in parallel, and the operating system can interrupt them at any moment. Powerful, but you must guard shared data carefully.
- **Fibers** run one at a time and only switch when the code chooses to. No surprise interruptions, so far fewer concurrency bugs.
- **Async/await** in other languages is usually built on top of a Fiber-like mechanism plus an event loop.

So a Fiber is not parallelism. It's a way to interleave waiting tasks efficiently on a single thread.

## When you actually need this

Be honest: for a typical request-response web app, you probably don't use Fibers directly. Your framework and the classic model work great.

Fibers shine when you have lots of I/O waiting at once — many concurrent API calls, a long-lived server handling many connections, or real-time features. In those cases you'll usually reach for a library (like an async runtime) that uses Fibers under the hood, so you write simple-looking code that runs concurrently. If long-lived processes interest you, see how [FrankenPHP worker mode](/blogs/frankenphp-worker-mode) keeps your app booted between requests.

## Conclusion

PHP Fibers gave the language a proper, built-in way to pause and resume code — the missing piece for real cooperative concurrency. You may never call `Fiber::suspend` yourself, but knowing what it does demystifies every async PHP library you'll meet. Start by recognizing where your code spends its time waiting; that's where this idea pays off.

## Resources

- [PHP manual: the Fiber class](https://www.php.net/manual/en/language.fibers.php)
- [ReactPHP](https://reactphp.org/) and [AMPHP](https://amphp.org/) (async runtimes that build on Fibers)
