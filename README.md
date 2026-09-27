# Alejandro Acosta — Portfolio

English-language personal portfolio built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and **Framer Motion**. Neon-themed single page with skills auto-tour, experience timeline, GitHub showcase, and projects.

## Stack

- Next.js App Router, TypeScript
- Tailwind CSS 4, Lenis smooth scroll
- GitHub GraphQL/REST (optional token for stats and contributions)

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` (never commit secrets):

| Variable        | Required | Description                                      |
|-----------------|----------|--------------------------------------------------|
| `GITHUB_TOKEN`  | Optional | GitHub PAT (`read:user`, `repo`) for live stats |

Without a token, the GitHub section falls back to limited public data.

## Deploy on Vercel

1. Import this repository in [Vercel](https://vercel.com/new).
2. Framework preset: **Next.js** (default).
3. Add `GITHUB_TOKEN` under **Settings → Environment Variables** if you want full GitHub metrics.
4. Deploy.

## Scripts

```bash
npm run build   # production build
npm run start   # serve production build
npm run lint    # ESLint
```

## License

Private portfolio — all rights reserved unless stated otherwise.
