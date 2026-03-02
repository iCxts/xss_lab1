# XSS Lab 1

An intentionally vulnerable Node.js web app covering three types of XSS attacks. Built for the League of Code cybersecurity curriculum.

## Vulnerabilities

- **Reflected XSS** - `/search` renders the query parameter directly without sanitization
- **Stored XSS** - `/announcements` stores and displays user-submitted content without sanitization, persisting for all viewers
- **DOM-based XSS** - `/schedule` returns JSON consumed by client-side JS that inserts data into the DOM unsafely

## Setup

```bash
docker build -t xss-lab .
docker run -p 3000:3000 xss-lab
```

Visit `http://localhost:3000`

## Tech

- Node.js, Express
- EJS templating
- Docker

## Warning

Deliberately insecure. Do not deploy publicly.
