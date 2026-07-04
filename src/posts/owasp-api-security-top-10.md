---
title: "OWASP API Security Top 10 in Practice"
date: "December 03, 2025"
coverImage: "/images/articles/owasp-api-security-top-10.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "APIs are where modern apps get attacked. Learn the top OWASP API security risks and concrete fixes you can apply to your REST or GraphQL API today."
category: "Security"
tags: ["API", "OWASP", "Security", "GraphQL"]
---

Most applications today are really just a thin client talking to an API. That means the API is where your real business logic — and your real risk — lives. Attackers know this, which is why API attacks have become one of the most common ways systems get breached. That makes API security a top concern for anyone building backends.

The OWASP API Security Top 10 is a well-known list of the risks that show up again and again. In this article we'll walk through the ones I see most often, with practical fixes. It applies whether your API speaks REST, GraphQL, or SOAP.

## Table of contents

1. [Why APIs are a favorite target](#why-apis-are-a-favorite-target)
2. [BOLA: broken object level authorization](#bola-broken-object-level-authorization)
3. [Broken authentication](#broken-authentication)
4. [Too much data: excessive exposure](#too-much-data-excessive-exposure)
5. [Mass assignment](#mass-assignment)
6. [A practical API security checklist](#a-practical-api-security-checklist)

## Why APIs are a favorite target

A user interface hides things: a button only appears if you're allowed to click it. An API hides nothing. Every endpoint is directly reachable by anyone who can send an HTTP request, in any order, with any values they like.

So the golden rule is simple: **never trust the client**. The frontend not showing a button is not security. The server must check, on every request, who is asking and whether they're allowed.

## BOLA: broken object level authorization

This is the number one API risk, and it's deceptively simple. Imagine an endpoint:

```
GET /api/invoices/1042
```

Your code checks that the user is logged in, loads invoice 1042, and returns it. Looks fine — but did you check that invoice 1042 *belongs to that user*? If not, anyone can change the number and read other people's invoices.

The fix is to always scope the query to the current user, not just look the object up by id:

```php
// Vulnerable: any logged-in user can read any invoice
$invoice = Invoice::find($id);

// Safe: only invoices owned by the current user
$invoice = Invoice::where('id', $id)
    ->where('user_id', $currentUser->id)
    ->firstOrFail();
```

Do this for every object your API returns or modifies. It's boring, repetitive, and the most important thing on this list.

## Broken authentication

Authentication is *who you are*; authorization is *what you can do*. Broken authentication means an attacker can pretend to be someone else. Common mistakes:

- Tokens that never expire, so a leaked token works forever.
- Weak or missing rate limiting on login, allowing password guessing.
- Secrets and API keys committed to the repository.

Sensible defaults: short-lived access tokens with refresh tokens, rate limiting on authentication endpoints, and secrets kept in environment variables — never in code. Catching leaked secrets and other issues early in CI is exactly what a [shift-left security pipeline](/blogs/shift-left-devsecops-github-actions) is for.

## Too much data: excessive exposure

A frequent pattern is returning the whole database record and letting the frontend "just use what it needs". The problem is the *client* filters the data, but the *response* still contains everything — including fields like password hashes, internal flags, or another user's email.

Return only what the caller needs. Use an explicit output shape (a resource, a DTO, a serializer) instead of dumping the raw model:

```php
// Instead of returning the full user model...
return [
    'id'    => $user->id,
    'name'  => $user->name,
    'avatar'=> $user->avatar_url,
];
```

## Mass assignment

The mirror image of the previous risk. If you take the whole request body and save it directly, an attacker can send extra fields you didn't expect:

```
PATCH /api/users/me
{ "name": "Vittorio", "role": "admin" }
```

If your code blindly saves everything, the user just made themselves an admin. Always whitelist which fields can be written, and ignore the rest.

## A practical API security checklist

You don't need to memorize all ten risks to be much safer. Start here:

1. Every endpoint checks ownership, not just authentication.
2. Tokens expire; authentication endpoints are rate-limited.
3. Responses expose only the fields the caller needs.
4. Writes accept only an explicit allowlist of fields.
5. Secrets live in environment variables, never in code.

Good API security isn't a feature you add at the end — it's a habit you apply on every endpoint. If you build these five checks into your normal workflow, you'll have closed the doors attackers reach for first. And if your API also exposes LLM features, remember that [prompt injection](/blogs/adding-llm-features-to-a-php-backend) is a newer class of risk worth planning for. Start small, be consistent, and your APIs will be far harder to break.

## Resources

- [OWASP API Security Project](https://owasp.org/API-Security/) (the full Top 10 with detailed explanations)
- [Laravel authorization docs](https://laravel.com/docs/authorization) (policies and gates)
