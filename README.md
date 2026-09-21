# Technical-Assessment
# Login Page Challenge — Rayan's App

A responsive login page built with React, TypeScript, Vite, and Material UI, featuring email validation and Google Sign-In via Firebase Authentication.

## Live Demo
https://login-challenge-4640b.web.app

## Tech Stack
- React + TypeScript + Vite
- Material UI (MUI)
- Firebase Authentication (Google Sign-In)
- Firebase Hosting
- React Router

## Features
- Responsive login UI matching the provided design (blue theme)
- Client-side email format validation with inline error messages
- Google Sign-In via Firebase Auth
- Post-login page displaying the user's access token, name, email, and avatar
- Persisted session handling (refresh-safe) via Firebase's auth state listener
- Logout functionality

## Getting Started Locally

1. Clone the repo
   \`\`\`
   git clone https://github.com/RayanMendis56/Technical-Assessment.git
   cd Technical-Assessment/login-challenge
   \`\`\`

2. Install dependencies
   \`\`\`
   npm install
   \`\`\`

3. Create a \`.env\` file in the project root using \`.env.example\` as a reference, and fill in your own Firebase project config.

4. Run the dev server
   \`\`\`
   npm run dev
   \`\`\`

## Build & Deploy

\`\`\`
npm run build
npx firebase-tools deploy
\`\`\`

## Project Structure

\`\`\`
src/
  assets/         # illustration and static assets
  pages/          # LoginPage, HomePage
  firebase/       # Firebase config and initialization
  App.tsx         # routing
  main.tsx        # app entry, theme provider
\`\`\`
