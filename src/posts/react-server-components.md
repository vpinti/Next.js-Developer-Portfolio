---
title: "React Server Components: A Practical Guide"
date: "July 30, 2024"
coverImage: "/images/articles/react-server-components.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "Learn how React Server Components render on the server, cut bundle size, and pair with client components. Start building faster React apps today."
category: "React"
tags: ["React", "Next.js", "Server Components"]
---

React Server Components (RSC) are one of the most significant additions to the React ecosystem in recent years. Introduced with React 18 and made popular by frameworks like Next.js, they change the way we think about rendering and structuring our applications. Instead of shipping every component to the browser, RSC let a large part of your UI run on the server, keeping the client light and fast.

In this guide we will walk through what React Server Components are, how they differ from client components, and how the two work together to build modern, performant apps.

## Table of contents

1. [What are React Server Components?](#1-what-are-react-server-components)
2. [Server Components vs client components](#2-server-components-vs-client-components)
3. [The "use client" directive](#3-the-use-client-directive)
4. [Composing server and client components](#4-composing-server-and-client-components)
5. [Conclusion](#conclusion)
6. [Resources](#resources)

## 1. What are React Server Components?

As the name suggests, React Server Components are components that run **exclusively on the server**. They are never sent to the browser, which means their code does not count toward the JavaScript bundle your users download.

This has a big impact on performance and developer experience:

- **Smaller bundle size**: the code for a Server Component stays on the server and is never shipped to the client. Heavy dependencies (a Markdown parser, a date library, a syntax highlighter) can live there without weighing down the browser.
- **Direct backend access**: because they run on the server, they can read from a database, hit the file system, or call internal APIs directly, without exposing a separate API endpoint.
- **Native async rendering**: a Server Component can be an `async` function and use `await` to load data before it renders.

```javascript
// A Server Component (the default in the Next.js App Router)
async function ArticleList() {
  const posts = await db.posts.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

Notice there is no `useEffect`, no loading state, and no fetch call from the browser. The data is fetched during server rendering and the finished HTML is sent to the client.

## 2. Server Components vs client components

With RSC we now work with two kinds of components:

1. **Server Components (the default)**: in frameworks like Next.js with the App Router, every component is a Server Component unless you say otherwise. They are great for fetching data, reading backend resources, and rendering non-interactive UI.
2. **Client components**: anything that needs interactivity. If you want state, effects, event handlers, or browser APIs, the component has to run in the browser.

The key limitation to remember: Server Components **cannot use hooks or state**. There is no `useState`, no `useEffect`, and no `onClick` inside a Server Component, because none of that exists on the server. When you need any of those, you reach for a client component.

Here is a quick way to decide:

- Use a **Server Component** to load data, access the backend directly, or render static content like text and layout.
- Use a **client component** to manage state (`useState`, `useReducer`), run browser effects (`useEffect`), attach event listeners (`onClick`, `onChange`), or use browser APIs (`window`, `localStorage`).

## 3. The "use client" directive

To turn a component into a client component, you add the `"use client"` directive at the very top of the file. This tells the bundler that the component (and its imports) should be included in the client bundle and hydrated in the browser.

```javascript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

Because this component uses `useState` and an `onClick` handler, it must run on the client. The `"use client"` directive marks the boundary: everything imported from here down is treated as client code. Keep these components small and focused so you ship as little JavaScript as possible.

## 4. Composing server and client components

The real power of RSC comes from composition. You can render client components inside Server Components, which lets you keep most of your tree on the server and only opt into client rendering where you truly need interactivity.

```javascript
// Server Component
import Counter from './counter'; // a client component

async function Page() {
  const settings = await getSettings();

  return (
    <main>
      <h1>{settings.title}</h1>
      <Counter />
    </main>
  );
}
```

A common pattern is passing Server Components to client components as `children` (or props), so the server-rendered content stays on the server while the interactive shell lives on the client. The rule to keep in mind: a Server Component can import and render a client component, but a client component cannot import a Server Component directly, because client code cannot reach into the server.

Following this pattern pushes interactive code to the edges of your tree and keeps the bundle size small, which is exactly what server rendering with RSC is designed to achieve.

## Conclusion

React Server Components represent a genuine shift in how we build React apps, moving toward a hybrid model that takes the best of both the server and the client. Server-rendered components reduce the JavaScript your users download, fetch data closer to the source, and compose cleanly with the client components that handle interactivity.

Understanding when to keep code on the server and when to reach for `"use client"` is a core skill for building fast, scalable, modern React applications. Start small, move one data-fetching component to the server, and watch your bundle size shrink.

## Resources

- [React Server Components (react.dev)](https://react.dev/reference/rsc/server-components)
- [Server Components in Next.js](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
