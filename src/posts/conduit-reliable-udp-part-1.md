---
title: "Reliable Delivery over UDP: Building Conduit in C (Part 1)"
date: "July 04, 2026"
coverImage: "/images/articles/conduit-reliable-udp-part-1.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "Why build reliable UDP when TCP exists? Part 1 of Conduit, my open-source transport protocol in C: the design behind channel-based delivery."
category: "Networking"
tags: ["C", "Networking", "UDP", "Protocols"]
featured: true
---

This is the first article in a series about **Conduit**, an open-source project I'm building in C: a modular, layered protocol for reliable UDP communication. The project is still in progress, so I'll use this series to explain the design as it takes shape. You can follow the code at [github.com/vpintidev/conduit](https://github.com/vpintidev/conduit).

In this first part I want to answer the most obvious question: why build anything on top of UDP at all, when TCP already gives you reliable delivery?

## Table of contents

1. [Why reliable UDP instead of TCP](#why-reliable-udp-instead-of-tcp)
2. [What "reliable" should mean](#what-reliable-should-mean)
3. [Channels with configurable guarantees](#channels-with-configurable-guarantees)
4. [The wire format, briefly](#the-wire-format-briefly)
5. [What's next in this series](#whats-next-in-this-series)

## Why reliable UDP instead of TCP

TCP and UDP are the two main ways to send data over the internet. TCP is like a phone call: a connection is established, and everything arrives in order, guaranteed. UDP is like sending postcards: each message is fired off independently, with no promise it arrives or arrives in order.

TCP sounds strictly better — so why does modern networking increasingly build on UDP? Because TCP's guarantees are a package deal you can't opt out of. Its "everything in order" rule causes a problem called head-of-line blocking: if one packet is lost, everything behind it waits, even unrelated data. For real-time apps (games, voice, live updates) that stall is worse than a lost message.

This is exactly why HTTP/3 and QUIC — the backbone of much of today's web — are built on UDP. They wanted reliability, but on *their own terms*. Conduit is my exploration of that same idea, in C, from first principles.

## What "reliable" should mean

The interesting realization is that "reliable" isn't one thing. It's a bundle of separate guarantees:

- **Delivery**: the message arrives at all (retransmit if lost).
- **Ordering**: messages arrive in the order they were sent.
- **Deduplication**: a message isn't processed twice.

TCP gives you all of them, always, whether you need them or not. But different data has different needs. A chat message needs delivery and ordering. A position update in a game needs the *latest* value fast — an old one arriving late is useless, so ordering barely matters.

Conduit's core idea is to let you pay only for the guarantees you actually use.

## Channels with configurable guarantees

To make that concrete, Conduit organizes traffic into **channels**. A channel is a logical stream within a single connection, and each channel picks its own guarantees.

For example, one connection might carry:

- a *reliable, ordered* channel for chat messages,
- an *unreliable* channel for frequent position updates,
- a *reliable, unordered* channel for one-off events.

Because they're separate channels, a lost packet on the chat channel doesn't block the position channel. You get the flexibility of UDP with the exact guarantees each kind of data needs — and none of the overhead it doesn't.

## The wire format, briefly

For different machines to talk, they must agree on the exact layout of bytes on the wire: which bytes are the channel id, which are the sequence number, where the payload starts. This is the "wire format".

I'm writing Conduit's wire format as a specification in the style of an IETF Internet-Draft, so it's precise and implementation-independent — not just whatever my C code happens to do. The project also has unit tests and a CI pipeline, because a protocol you can't test is a protocol you can't trust. We'll dig into the actual packet layout in the next part.

## What's next in this series

This part covered the *why* behind reliable UDP and the core design idea: reliability as separate, per-channel guarantees. In upcoming parts I plan to cover the concrete packet layout, how retransmission and acknowledgements work, and lessons learned building it in C.

Since the project is still evolving, some details will change as I go — that's part of the fun of building a protocol in the open. If [networking](/category/Networking) and systems programming interest you, follow along on the [Conduit repository](https://github.com/vpintidev/conduit), and I'll see you in Part 2.

## Resources

- Conduit on GitHub: github.com/vpintidev/conduit
- RFC 9000 (QUIC) — a real-world reliable protocol over UDP
