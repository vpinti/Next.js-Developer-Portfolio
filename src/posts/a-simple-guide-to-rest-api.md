---
title: "A Simple Guide to REST APIs"
date: "August 07, 2025"
coverImage: "/images/articles/a-simple-guide-to-rest-api.svg"
coverImageWidth: 800
coverImageHeight: 600
excerpt: "Learn what a REST API is, how it works, and how to build one with Node.js and Express. Start building your first REST API today."
category: "API"
tags: ["API", "REST", "Node.js", "Express"]
---

Have you ever wondered how apps talk to each other? When you check the weather on your phone or send a message, your app is talking to another computer. This happens through something called an API, and one of the most common types is a REST API.

In this guide, we’ll learn what a REST API is, how it works, and how to create a super simple one with Node.js and Express.

## Table of contents

1. [What is an API?](#1-what-is-an-api)
2. [What is a REST API?](#2-what-is-a-rest-api)
3. [How REST APIs work](#3-how-rest-apis-work)
4. [Creating a simple REST API (Using Node.js and Express)](#4-creating-a-simple-rest-api-using-nodejs-and-express)
5. [Testing your API](#5-testing-your-api)
6. [Conclusion](#conclusion)
7. [Resources](#resources)

---

## 1. What is an API?

An API (Application Programming Interface) is like a waiter in a restaurant. You tell the waiter what you want, and they bring it to you from the kitchen. An API lets one program request information or send instructions to another.

## 2. What is a REST API?

REST stands for **REpresentational State Transfer**. It’s a set of rules that lets programs talk to each other using simple HTTP methods like:

- **GET** – to get data
- **POST** – to add new data
- **PUT** – to update data
- **DELETE** – to delete data

A REST API uses these methods to interact with resources, like a list of books, users, or photos.

## 3. How REST APIs work

Imagine you have a website about books. You can build a REST API so other apps can:

- Get a list of all books
- Add a new book
- Edit a book
- Delete a book

Each action will be done by calling a specific URL and method.

**Example:**

- `GET /books` → Get all books
- `POST /books` → Add a book
- `PUT /books/1` → Edit book with ID 1
- `DELETE /books/1` → Delete book with ID 1

## 4. Creating a simple REST API (Using Node.js and Express)

Let’s build a tiny REST API for managing books.

### Step 1: Set up your project

Make a new folder, then run these commands in your terminal:

```bash
npm init -y  
npm install express
```

### Step 2: Create `index.js` with this code:

```javascript
const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: 'Harry Potter' },
  { id: 2, title: 'Lord of the Rings' }
];

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a book
app.post('/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Start server
app.listen(3000, () => {
  console.log('API is running on http://localhost:3000');
});
```

## 5. Testing your API

You can use a tool like Postman or your browser (for GET requests) to test the API. Try going to:

```
http://localhost:3000/books
```

You’ll see the list of books!

## Conclusion

REST APIs are everywhere. Learning how a REST API works is a great step into web development. Once you understand the basics, you can build apps, websites, or even mobile apps that talk to each other.

Keep it simple, practice a lot, and have fun building!

## Resources

- [MDN Web Docs - HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)
- [MDN Web Docs - REST](https://developer.mozilla.org/en-US/docs/Glossary/REST)
- [Postman](https://www.postman.com/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
