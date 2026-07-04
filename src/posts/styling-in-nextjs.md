---
title: "Styling in Next.js: From Tailwind to CSS-in-JS"
date: "July 25, 2024"
coverImage: "/images/articles/styling-in-nextjs.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "A practical guide to styling in Next.js: global CSS, CSS Modules, Tailwind CSS, CSS-in-JS and Sass. Pick the right approach for your project."
category: "CSS"
tags: ["CSS", "Next.js", "Tailwind CSS", "Styled Components"]
---

One of the best things about styling in Next.js is that the framework never forces a single approach on you. You can drop in a global stylesheet, scope styles per component, embrace a utility-first workflow, or write your CSS directly in JavaScript. That freedom is great, but it can also be overwhelming when you are starting a new project and have to decide which tool to reach for.

In this guide we will walk through the most common options, look at short examples, and talk about the trade-offs so you can make a confident choice.

## Table of contents

1. [Global CSS](#1-global-css)
2. [CSS Modules](#2-css-modules)
3. [Styling in Next.js with Tailwind CSS](#3-styling-in-nextjs-with-tailwind-css)
4. [CSS-in-JS and styled-components](#4-css-in-js-and-styled-components)
5. [Sass support](#5-sass-support)
6. [Conclusion](#conclusion)
7. [Resources](#resources)

## 1. Global CSS

The simplest starting point is a global stylesheet. It is perfect for resets, typography defaults, CSS variables, and anything that should apply across the whole app.

With the Pages Router you import your global CSS in `pages/_app.js`. With the App Router you import it in `app/layout.js`. Next.js only allows global CSS to be imported from these top-level entry points, which keeps the bundle predictable.

```css
/* styles/globals.css */
body {
  font-family: "Inter", sans-serif;
  background-color: #f0f2f5;
  color: #1b1b1b;
}
```

Global CSS is easy to reason about, but because everything shares one namespace, class-name collisions become more likely as the project grows.

## 2. CSS Modules

CSS Modules solve the naming problem by scoping styles locally to a component. Next.js supports them out of the box: name a file with the `.module.css` suffix and the class names get hashed automatically, so `.error` in one component never clashes with `.error` in another.

```css
/* components/Button.module.css */
.error {
  color: white;
  background-color: red;
}
```

```jsx
// components/Button.js
import styles from "./Button.module.css";

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

CSS Modules give you real CSS with automatic scoping and zero runtime cost. They are a solid default when you want to keep writing plain CSS but avoid global leaks.

## 3. Styling in Next.js with Tailwind CSS

Tailwind CSS is a utility-first framework that has become extremely popular for styling in Next.js, and it is the default choice in the official `create-next-app` template. Instead of writing custom CSS, you compose small utility classes directly in your JSX.

```jsx
<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div className="shrink-0">
    <img className="h-12 w-12" src="/logo.svg" alt="ChitChat Logo" />
  </div>
  <div>
    <div className="text-xl font-medium text-black">ChitChat</div>
    <p className="text-slate-500">You have a new message!</p>
  </div>
</div>
```

Because unused classes are stripped at build time, the production CSS stays tiny. The main trade-off is markup that can feel noisy at first, but the consistency and speed usually win teams over quickly.

## 4. CSS-in-JS and styled-components

CSS-in-JS libraries such as styled-components and Emotion let you write styles right next to your component logic, using tagged template literals. This keeps everything colocated and makes dynamic, prop-driven styling very natural.

```jsx
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export function Heading() {
  return <Title>Hello World!</Title>;
}
```

One important caveat: most CSS-in-JS libraries run in the browser and are not compatible with React Server Components by default. In the App Router you have to mark styled components as client components and add a style registry so the styles are rendered correctly on the server. It works well, but it takes extra setup and adds some runtime cost.

## 5. Sass support

If you prefer a preprocessor, Next.js has built-in support for Sass. Install `sass` and you can use `.scss` or `.sass` files, including as CSS Modules with the `.module.scss` extension. This gives you variables, nesting, and mixins without any extra configuration.

```scss
// components/Card.module.scss
$radius: 12px;

.card {
  border-radius: $radius;
  padding: 1rem;

  .title {
    font-weight: 700;
  }
}
```

Sass pairs nicely with CSS Modules when your team already knows the syntax and wants more expressive power than plain CSS.

## Conclusion

There is no single winner when it comes to styling in Next.js. Global CSS is great for app-wide basics, CSS Modules give you safe scoping with plain CSS, Tailwind CSS offers a fast and consistent workflow, CSS-in-JS shines for dynamic component styles, and Sass adds preprocessor power on top of it all.

Pick the approach that matches your project's needs and your team's comfort, and remember that these options are not mutually exclusive. A common, productive setup is Tailwind CSS for most of the work, with a small global stylesheet for resets and design tokens. Start simple, and let the project guide you toward what it really needs.

## Resources

- [Next.js styling documentation](https://nextjs.org/docs/app/building-your-application/styling)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
