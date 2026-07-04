---
title: "Next.js Data Fetching: Server Components & App Router"
date: "August 20, 2024"
coverImage: "/images/articles/data-fetching-nextjs.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "Learn Next.js data fetching with async Server Components, fetch caching, and the App Router. Start building faster, cleaner pages today."
category: "Next.js"
tags: ["Next.js", "Data Fetching", "React", "App Router"]
---

The App Router reshaped how we load data in Next.js. Instead of special lifecycle functions, Next.js data fetching now lives directly inside your components, powered by React Server Components. If you have wrestled with `useEffect`, loading spinners, and prop drilling just to show a list of posts, you are going to enjoy this. In this guide we will walk through fetching in async Server Components, controlling `fetch` caching and revalidation, and writing to your backend with Server Actions.

## Table of contents

1. [Why Next.js data fetching changed](#why-nextjs-data-fetching-changed)
2. [Fetching in async Server Components](#fetching-in-async-server-components)
3. [Caching and revalidation with fetch](#caching-and-revalidation-with-fetch)
4. [Mutating data with Server Actions](#mutating-data-with-server-actions)
5. [Conclusion](#conclusion)
6. [Resources](#resources)

## Why Next.js data fetching changed

In the Pages Router you reached for `getStaticProps` or `getServerSideProps`, functions that ran outside your components and passed data down as props. It worked, but it forced an awkward split between "where data is fetched" and "where data is used."

The App Router removes that split. Components render on the server by default, so they can talk to your database or API before any HTML reaches the browser. The result is less boilerplate, smaller client bundles, and data that starts loading as early as possible.

## Fetching in async Server Components

The most direct approach is to make a Server Component `async` and simply `await` your data inside it. Because these components run on the server, they can perform asynchronous work before sending rendered HTML to the client.

```jsx
async function getData() {
  const res = await fetch("https://api.example.com/data");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();

  return (
    <main>
      <h1>{data.title}</h1>
    </main>
  );
}
```

This pattern is powerful because it:

- **Reduces waterfalls**: data requests begin as early as possible in the render.
- **Simplifies your code**: no `useEffect` and `useState` juggling to track loading and error states.
- **Keeps secrets safe**: API keys and tokens stay on the server and never ship to the client.

When you do need loading UI, add a `loading.js` file to the route segment. Next.js wraps the page in a Suspense boundary automatically and streams content in as it becomes ready.

## Caching and revalidation with fetch

Next.js extends the native `fetch` API so you can configure caching on a per-request basis. This is where a lot of the App Router's performance story lives, so it pays to understand the three main modes.

### Static data (cached)

By default, a `fetch` result can be cached and reused, which is the spirit of the old `getStaticProps`. The data is resolved once and served fast on every visit.

```javascript
// Fetched and cached; reused across requests
fetch("https://...");
```

### Time-based revalidation

To refresh data on a schedule, use the `next.revalidate` option. This is how you implement Incremental Static Regeneration (ISR): serve cached data, then quietly rebuild it after the interval passes.

```javascript
// Revalidate this request at most once every 60 seconds
fetch("https://...", { next: { revalidate: 60 } });
```

### Dynamic data (no cache)

When a response must be fresh on every request, opt out of caching entirely. This is the equivalent of `getServerSideProps`.

```javascript
// Dynamic data, fetched on every request
fetch("https://...", { cache: "no-store" });
```

A quick note for newer versions: default caching behavior has shifted across Next.js releases, so when in doubt, be explicit with `cache` or `next.revalidate` rather than relying on defaults.

## Mutating data with Server Actions

Reading data is only half the story. Server Actions let you write data too, without hand-rolling an API route. Mark a function with `"use server"` and call it straight from a form.

```jsx
export default function NewPost() {
  async function createPost(formData) {
    "use server";
    const title = formData.get("title");
    await savePost({ title });
  }

  return (
    <form action={createPost}>
      <input name="title" />
      <button type="submit">Save</button>
    </form>
  );
}
```

After a mutation you can call `revalidatePath` or `revalidateTag` to refresh exactly the cached data that changed, keeping the UI in sync without a full reload.

## Conclusion

Next.js data fetching in the App Router is more intuitive and more capable than what came before. By leaning on async Server Components, the extended `fetch` API, and Server Actions, you control caching and revalidation with real precision while writing far less glue code. Start small: convert one page to an async Server Component, pick a caching strategy that fits its data, and build from there. Once it clicks, you will not want to go back.

## Resources

- [Next.js Data Fetching docs](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [React Server Components reference](https://react.dev/reference/rsc/server-components)
