# FootPrint 🐾

A spending-to-carbon tracker that connects to your bank, scores every transaction, nudges you toward greener alternatives, and rewards you for going green.

## Prerequisites

- **Node.js** v18 or higher — [download here](https://nodejs.org/)
- **npm** (comes bundled with Node.js)

To verify you have them installed:

```bash
node -v
npm -v
```

## Getting Started

1. **Clone the repo**

```bash
git clone <your-repo-url>
cd FootPrint
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the dev server**

```bash
npm run dev
```

4. Open **http://localhost:5173/** in your browser. Changes auto-reload.

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool / dev server |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx           Shared shell (Navbar + Mascot on every page)
│   ├── Navbar.jsx            Sticky top nav with links + mobile menu
│   └── Mascot.jsx            Floating plant mascot (bottom-right corner)
├── pages/
│   ├── Landing.jsx           /              Hero + feature overview
│   ├── CarbonProfile.jsx     /profile       Bank connection + transaction analysis
│   ├── ReceiptScanner.jsx    /scanner       Receipt OCR + smoke atmosphere effect
│   ├── RewardsDashboard.jsx  /rewards       Tiers, FutureCoins, real-world impact
│   └── GreenAlternatives.jsx /alternatives  Sustainable product alternatives
├── App.jsx                   Router setup
├── main.jsx                  Entry point
└── index.css                 Tailwind imports + custom theme
```

## Page Assignments

| Page | Route | Owner |
|---|---|---|
| Carbon Profile | `/profile` | Shaurya / Paul |
| Receipt Scanner | `/scanner` | Aarush |
| Green Rewards | `/rewards` | — |
| Green Alternatives | `/alternatives` | Paul |

## Troubleshooting

- **`npm install` fails** — Make sure you're on Node 18+. Run `node -v` to check.
- **Port 5173 already in use** — Kill the other process or run `npm run dev -- --port 3000` to use a different port.
- **Styles not showing** — Tailwind CSS v4 is integrated via the Vite plugin. Make sure `npm install` completed without errors.
