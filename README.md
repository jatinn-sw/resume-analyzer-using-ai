# Lumen — AI Resume Analyzer

Analyze a resume against a job description and get structured, ATS-oriented feedback.

Built with **React Router (v7)** + **Vite** + **TypeScript** + **Tailwind**. It uses **Puter** (Puter.js) for:

- **Auth**: sign in
- **FS**: store uploaded resume PDF + generated preview image
- **KV**: persist analyses + feedback
- **AI**: generate structured feedback (JSON)

## Tech stack

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=0B1120)
![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?logo=reactrouter&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-state%20store-000000?logo=zustand&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-pdfjs--dist-FF7139?logo=adobeacrobatreader&logoColor=white)
![Puter](https://img.shields.io/badge/Puter.js-platform-111827)

## Getting started

### Prerequisites

- Node.js (recent LTS recommended)
- A Puter account (the app will prompt you to sign in)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

## How it works

1. Sign in via Puter.
2. Upload resume PDF + provide job title/description if available.
3. Store the PDF in Puter FS.
4. Convert to a PNG and store it in Puter FS.
5. Send the prompt  to Puter AI.
6. Save the result to Puter KV under a unique key and render it on the review route.


## Scripts

- `npm run dev`: start dev server (HMR)
- `npm run build`: build for production
- `npm run start`: serve the production build
- `npm run typecheck`: React Router typegen + TypeScript check

## Docker

Build and run:

```bash
docker build -t lumen .
docker run --rm -p 3000:3000 lumen
```

Then open `http://localhost:3000`.

## Troubleshooting

- **PDF preview doesn’t work**: confirm `public/pdf.worker.min.mjs` exists and is accessible at `/pdf.worker.min.mjs`.
