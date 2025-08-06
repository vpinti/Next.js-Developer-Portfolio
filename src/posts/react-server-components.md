---
title: "Guida ai React Server Components"
date: "2024-07-30"
coverImage: "https://placehold.co/1200x400.png"
excerpt: "I Server Components sono una nuova funzionalità di React che ci permette di renderizzare componenti lato server, riducendo il bundle JavaScript inviato al client."
category: "React"
tags: ["React", "Next.js", "Server Components"]
---

# Guida ai React Server Components

I React Server Components (RSC) sono una delle aggiunte più significative all'ecosistema React degli ultimi anni, introdotti con React 18 e resi popolari dal framework Next.js. Cambiano radicalmente il modo in cui pensiamo alla renderizzazione e all'architettura delle nostre applicazioni.

## Cosa sono i Server Components?

Come suggerisce il nome, i Server Components sono componenti React che vengono eseguiti **esclusivamente sul server**. Non vengono inviati al client, il che significa che non contribuiscono al bundle JavaScript della nostra applicazione.

Questo ha implicazioni enormi sulla performance:
- **Zero-Bundle-Size**: Il codice dei Server Components non viene scaricato dal browser.
- **Accesso diretto al backend**: Possono accedere direttamente a risorse del backend (database, file system, API interne) senza dover creare un endpoint API apposito.
- **Renderizzazione asincrona**: Possono usare `async/await` per caricare dati in modo nativo.

## Client Components vs. Server Components

Con l'introduzione dei RSC, ora abbiamo due tipi di componenti:

1.  **Server Components (Default)**: In framework come Next.js (con l'App Router), tutti i componenti sono Server Components di default.
2.  **Client Components**: Per rendere un componente interattivo (usando `useState`, `useEffect`, eventi, ecc.), dobbiamo marcarlo esplicitamente con la direttiva `"use client"` all'inizio del file.

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

### Quando usare uno e quando l'altro?

-   **Server Components** per:
    -   Caricare dati.
    -   Accedere direttamente a risorse del backend.
    -   Componenti senza interattività (es. testo, layout statico).
-   **Client Components** per:
    -   Gestire lo stato con hook (`useState`, `useReducer`).
    -   Usare effetti collaterali legati al browser (`useEffect`).
    -   Aggiungere event listener (`onClick`, `onChange`).
    -   Utilizzare API del browser (`window`, `localStorage`).

## Conclusione

I Server Components rappresentano un cambio di paradigma per lo sviluppo React, spingendo verso un modello ibrido che sfrutta il meglio del server e del client. Comprendere come e quando usarli è fondamentale per costruire applicazioni React moderne, performanti e scalabili.
