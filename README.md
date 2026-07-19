# ResumeForge AI

ResumeForge AI is a full-stack resume-building platform that treats a resume as structured, machine-readable data rather than a static document. Instead of fighting margins and formatting in a word processor, users build their professional history as a schema-backed profile, then let an AI engine tailor and optimize it for specific job descriptions and Applicant Tracking Systems (ATS).

## Overview

- **The Problem:** Traditional resumes built in word processors break formatting easily and often fail when parsed by ATS software.
- **The Approach:** Professional data is decoupled from presentation and stored in a structured MongoDB schema, keeping it relational and ready for mapping to any template.
- **The AI Layer:** Powered by the Groq API running Llama models, providing fast keyword optimization, semantic tailoring, and phrasing suggestions aligned to a target job description.

## Features

- **AI-Powered Assistance** — smart suggestions to enhance resume content, plus an AI chat assistant for tailoring resumes to specific roles.
- **Professional, ATS-Friendly Templates** — modern layouts designed to parse cleanly through Applicant Tracking Systems.
- **Browse & Filter Resumes** — search and filter through resumes with dedicated loading states.
- **Authentication** — secure email/password auth via Better Auth with a MongoDB adapter.
- **Export & Share** — download resumes or share a link directly with recruiters.
- **Light/Dark Mode** — theme toggle with a polished, animated UI (Framer Motion / `motion`, Tailwind CSS).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion (`motion`), `react-fast-marquee` |
| Auth | [Better Auth](https://www.better-auth.com/) with `@better-auth/mongo-adapter` |
| Database | MongoDB |
| AI | [Groq SDK](https://groq.com/) (Llama models) |
| Icons | lucide-react |

> Note: this repository contains the **Next.js frontend**. It expects a companion REST API (Express/MongoDB) that serves resume data at the endpoints described below.

## Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── about/            # Project overview page
│   ├── add-resume/       # Create a new resume
│   ├── api/auth/         # Better Auth route handler
│   ├── brouse-resumes/   # Browse/search resumes
│   ├── details/[id]/     # Single resume detail view
│   ├── login/            # Login page
│   ├── my-resume/        # Current user's resume
│   └── register/         # Registration page
├── components/           # AiSuggestions, ResumeChat, ResumeCard, ResumeFilters, etc.
├── Layers/                # Landing page sections (Hero, Features, Steps, CTA, Footer, Navbar)
└── lib/                   # Better Auth server & client config
```

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB connection string
- A [Groq API key](https://console.groq.com/) (used by the backend AI features)
- A running backend API (resume CRUD + AI endpoints) reachable at `NEXT_PUBLIC_URL`

### Installation

```bash
git clone https://github.com/neya-mul/ResumeForge.git
cd ResumeForge
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
# MongoDB connection string used by Better Auth
MONGO_URI=your_mongodb_connection_string

# Base URL of the Better Auth server (this app)
BETTER_AUTH_URL=http://localhost:3000

# Base URL of the backend resume/AI REST API
NEXT_PUBLIC_URL=http://localhost:5000
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Other scripts

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Backend API Expectations

The frontend calls a separate REST API for resume data, so make sure the following endpoints are available at `NEXT_PUBLIC_URL`:

- `GET /api/resumes` — list/browse resumes (supports filter query params)
- `GET /api/resumes/:id` — resume details
- `GET /api/resumes/user/:userId` — the current user's resume
- `POST /api/resumes` — create a resume
- `DELETE /api/resumes/:id` — delete a resume
- `POST /api/resumes/:id/ai-suggestions` — AI content suggestions
- `POST /api/resumes/:id/chat` — AI resume-tailoring chat

## Contributing

Contributions are welcome:

1. Fork the project
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feat/my-feature`
5. Open a pull request

## License

No license has been specified yet for this project.