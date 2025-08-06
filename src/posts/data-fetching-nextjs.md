---
title: "Data Fetching in Next.js 14 con l'App Router"
date: "2024-07-20"
coverImage: "https://placehold.co/1200x400.png"
excerpt: "L'App Router di Next.js ha rivoluzionato il data fetching, integrandolo direttamente nel lifecycle di React con i Server Components."
category: "Next.js"
tags: ["Next.js", "Data Fetching", "React"]
---

# Data Fetching in Next.js 14 con l'App Router

Con l'introduzione dell'App Router, Next.js ha semplificato e potenziato il modo in cui recuperiamo i dati, sfruttando appieno i React Server Components.

## Fetching con `async/await` nei Server Components

Il modo più diretto per caricare dati è usare `async/await` direttamente all'interno di un Server Component. Poiché questi componenti vengono eseguiti sul server, possono accedere ai dati in modo asincrono prima di inviare l'HTML renderizzato al client.

```jsx
async function getData() {
  const res = await fetch('https://api.example.com/data');

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Page() {

  const data = await getData();
  
  return (<main>
    <h1>{data.title}</h1>
  </main>);
}
```

Questo approccio è incredibilmente potente perché:
- **Riduce i waterfall**: Le richieste di dati iniziano il prima possibile.
- **Semplifica il codice**: Non c'è bisogno di `useEffect` e `useState` per gestire stati di caricamento ed errore.

## Caching e Revalidazione

Next.js estende l'API `fetch` nativa per permettere di configurare il caching per ogni singola richiesta.

### Static Data Fetching (Default)

Di default, ogni richiesta `fetch` viene cachata indefinitamente. Questo è l'equivalente di `getStaticProps` nel Pages Router.

```javascript
// Questo dato verrà caricato durante la build e cachato
fetch('https://...');
```

### Revalidazione basata sul tempo

Per aggiornare i dati periodicamente, possiamo usare l'opzione `next.revalidate`.

```javascript
// Revalida questa richiesta ogni 60 secondi
fetch('https://...', { next: { revalidate: 60 } });
```
Questo è l'equivalente di `revalidate` in `getStaticProps` e permette di implementare l'Incremental Static Regeneration (ISR).

### Dynamic Data Fetching

Per caricare dati dinamicamente ad ogni richiesta, possiamo disabilitare la cache.

```javascript
// Dati dinamici, caricati ad ogni richiesta
fetch('https://...', { cache: 'no-store' });
```
Questo è l'equivalente di `getServerSideProps`.

## Conclusione

L'App Router di Next.js ha reso il data fetching più intuitivo e potente. Sfruttando i Server Components e l'API `fetch` estesa, possiamo gestire in modo granulare strategie di caching e revalidazione, ottimizzando le performance e l'esperienza utente.
