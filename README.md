# 🐾 FootPrint
(Submitting for Sustainability & FinTech category)

A spending-to-carbon tracker that connects to your bank, scores every transaction, nudges you toward greener alternatives, and rewards you for going green.
## 📜 Table of Contents
1. [🌍 Mission](#-mission)
2. [📖 About](#-about)
3. [✨ Features](#-features)
4. [⚙️ Setup Instructions](#️-setup-instructions)
5. [🛠 Tech Stack](#-tech-stack)

## 🌍 Mission
Our goal is to empower individuals to understand and reduce their carbon footprint through their daily spending habits. By connecting financial data with environmental impact, we nudge users toward greener alternatives and reward sustainable choices.

## 📖 About
FootPrint is a spending-to-carbon tracker that connects to your bank, scores every transaction, and rewards you for going green. It has 4 main features:
1) **Carbon Profile**: Connect your bank account via Plaid to see the carbon cost of every purchase.
2) **Receipt Scanner**: Scan receipts to track individual items and watch your impact in real time with visual atmosphere effects.
3) **Green Rewards**: Unlock cashback, rebates, and FutureCoins as you improve your green score.
4) **Green Alternatives**: Find sustainable alternatives for everyday products and earn points for every switch.

## ✨ Features
✅ Real-time transaction scoring using **Plaid API**
✅ AI-powered receipt scanner for itemized carbon tracking
✅ Gamified rewards system with **FutureCoins**
✅ Interactive plant mascot that grows with your green choices
✅ Sustainable product alternative recommendations
✅ Detailed visualizations of spending vs. carbon impact

---

## ⚙️ Setup Instructions
### 🔧 Prerequisites
- Node.js (v18+)
- npm

### 🚀 Installation Steps
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd FootPrint
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your Plaid credentials (get them from Plaid Dashboard):
   ```
   PLAID_CLIENT_ID=your_client_id_here
   PLAID_SECRET=your_sandbox_secret_here
   PLAID_ENV=sandbox
   ```
4. **Start Application**
   ```bash
   npm run dev
   ```
   This runs the Vite frontend (http://localhost:5173) and Express backend (http://localhost:3001).

   > **Note:** Use Plaid Sandbox credentials: User `user_good`, Pass `pass_good`.

---

## 🛠 Tech Stack
| Component     | Technology |
|--------------|------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 |
| **Backend**  | Express.js |
| **Routing**  | React Router 7 |
| **Banking API** | Plaid SDK |

---

🚀 *Join us in building a greener future, one transaction at a time!* 🌟

Meet the team behind FootPrint:

![image](https://github.com/user-attachments/assets/68741c6b-f361-4263-bd2e-0353f58daa62)
<div align="center">
  <table>
    <tr>
      <td align="center">
        <p><strong>Paul Edelman</strong></p>
        <a href="https://www.linkedin.com/in/paul-edelman/">
          <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
        </a>
      pedelman@udel.edu
      </td>
      <td align="center">
        <p><strong>Shaurya Kumar</strong></p>
        <a href="https://www.linkedin.com/in/shauryak/">
          <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
        </a>
        shaurya@udel.edu
      </td>
      <td align="center">
        <p><strong>Chinmay Agrawal</strong></p>
        <a href="https://www.linkedin.com/in/cagrawal19/">
          <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
        </a>
          cagrawal@udel.edu
      </td>
      <td align="center">
        <p><strong>Aarush Goyal</strong></p>
        <a href="https://www.linkedin.com/in/aarushgoyal/">
          <img src="https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin" alt="LinkedIn">
        </a>
          aarushg@udel.edu
      </td>
    </tr>
  </table>
</div>

<p align="right"><a href="#readme-top">↑ Back to Top ↑</a></p>
Made with ❤️.