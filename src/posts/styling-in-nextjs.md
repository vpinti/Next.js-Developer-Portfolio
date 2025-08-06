---
title: "Opzioni di Stile in Next.js: Da Tailwind a CSS-in-JS"
date: "2024-07-25"
coverImage: "https://placehold.co/1200x400.png"
excerpt: "Next.js offre flessibilità incredibile quando si tratta di styling. Esploriamo le opzioni più popolari per dare stile alle tue applicazioni."
category: "CSS"
tags: ["CSS", "Next.js", "Tailwind CSS", "Styled Components"]
---

# Opzioni di Stile in Next.js

Next.js è un framework flessibile che non impone un unico modo per gestire lo stile. Questo permette agli sviluppatori di scegliere l'approccio che preferiscono. Vediamo le opzioni più comuni.

## 1. Fogli di Stile Globali

L'approccio più semplice è usare un foglio di stile globale. In un'applicazione Next.js, basta importare il file CSS nel file `_app.tsx` (o `layout.tsx` con l'App Router).

```css
/* styles/globals.css */
body {
  font-family: 'Inter', sans-serif;
  background-color: #f0f2f5;
}
```

## 2. CSS Modules

I CSS Modules permettono di scrivere CSS con scope locale per ogni componente, evitando conflitti di nomi. Next.js ha il supporto integrato per i CSS Modules. Basta nominare i file con il suffisso `.module.css`.

```css
/* components/Button.module.css */
.error {
  color: white;
  background-color: red;
}
```

```jsx
// components/Button.js
import styles from './Button.module.css';

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

## 3. Tailwind CSS

Tailwind CSS è un framework utility-first che ha guadagnato un'enorme popolarità. Permette di costruire design complessi direttamente nel JSX, senza scrivere CSS personalizzato. L'integrazione con Next.js è eccellente e altamente raccomandata.

```jsx
<div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div className="shrink-0">
    <img className="h-12 w-12" src="/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div className="text-xl font-medium text-black">ChitChat</div>
    <p className="text-slate-500">You have a new message!</p>
  </div>
</div>
```

## 4. CSS-in-JS (Styled Components, Emotion)

Librerie come Styled Components ed Emotion permettono di scrivere CSS direttamente nel file JavaScript del componente. Questo approccio è molto potente ma può avere un costo in termini di performance sul client, specialmente con i Server Components.

```jsx
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

<Title>Hello World!</Title>
```

Con l'avvento dei Server Components, è importante notare che molte librerie CSS-in-JS richiedono una configurazione specifica per funzionare correttamente in un ambiente server-first.

## Conclusione

La scelta dipende dalle esigenze del progetto e dalle preferenze del team. Tailwind CSS offre un'esperienza di sviluppo rapida e coerente, mentre i CSS Modules forniscono un ottimo isolamento. Le soluzioni CSS-in-JS offrono la massima potenza, ma richiedono maggiore attenzione alle performance.
