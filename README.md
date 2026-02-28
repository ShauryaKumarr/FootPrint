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

3. **Set up environment variables**

```bash
cp .env.example .env
```

Then edit `.env` with your Plaid credentials:

```
PLAID_CLIENT_ID=your_client_id_here
PLAID_SECRET=your_sandbox_secret_here
PLAID_ENV=sandbox
```

To get these:
- Go to https://dashboard.plaid.com/signup and create a free account
- Navigate to **Keys** in the dashboard
- Copy your **client_id** and **Sandbox secret**

4. **Start both frontend and backend**

```bash
npm run dev
```

This runs the Vite frontend on http://localhost:5173/ and the Express API server on http://localhost:3001/ concurrently.

> **No Plaid keys yet?** No problem — click "Try Demo Mode" on the Carbon Profile page to use pre-loaded mock transactions.

## Available Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start frontend + backend together |
| `npm run dev:frontend` | Start only the Vite frontend |
| `npm run server` | Start only the Express API server |
| `npm run build` | Build frontend for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Plaid Sandbox Credentials

When the Plaid Link modal opens, use these test credentials:

| Field | Value |
|---|---|
| Username | `user_good` |
| Password | `pass_good` |

No real bank data is involved. Plaid Sandbox returns realistic fake transactions.

## Tech Stack

| Tool | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI framework |
| [Vite 7](https://vite.dev/) | Build tool / dev server |
| [React Router 7](https://reactrouter.com/) | Client-side routing |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Express](https://expressjs.com/) | Backend API server |
| [Plaid SDK](https://plaid.com/docs/) | Bank account linking & transactions |

## Project Structure

```
├── server/
│   └── index.js                Express API (Plaid endpoints)
├── src/
│   ├── components/
│   │   ├── Layout.jsx           Shared shell (Navbar + Mascot on every page)
│   │   ├── Navbar.jsx            Sticky top nav with links + mobile menu
│   │   └── Mascot.jsx            Floating plant mascot (bottom-right corner)
│   ├── pages/
│   │   ├── Landing.jsx           /              Hero + feature overview
│   │   ├── CarbonProfile.jsx     /profile       Plaid integration + carbon scoring
│   │   ├── ReceiptScanner.jsx    /scanner       Receipt OCR + smoke atmosphere effect
│   │   ├── RewardsDashboard.jsx  /rewards       Tiers, FutureCoins, real-world impact
│   │   └── GreenAlternatives.jsx /alternatives  Sustainable product alternatives
│   ├── utils/
│   │   ├── carbonScoring.js      CO2 multipliers, grading, budget, reduction suggestions
│   │   └── mockTransactions.js   Demo transaction data
│   ├── App.jsx                   Router setup
│   ├── main.jsx                  Entry point
│   └── index.css                 Tailwind imports + custom theme
├── .env.example                 Template for environment variables
└── package.json
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
- **Port 5173 already in use** — Kill the other process or run `npm run dev:frontend -- --port 3000`.
- **Plaid "Connect with Plaid" button is disabled** — The backend isn't running. Make sure `npm run dev` starts both servers, or run `npm run server` separately.
- **"Plaid server not detected" message** — Create your `.env` file with valid Plaid Sandbox keys. See step 3 above.
- **Styles not showing** — Tailwind CSS v4 is integrated via the Vite plugin. Make sure `npm install` completed without errors.
