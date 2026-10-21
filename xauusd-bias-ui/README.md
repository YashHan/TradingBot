# XAUUSD Fundamental Bias: React frontend (V1 skeleton)

## Set up (about 5 minutes)

1. Create a fresh Vite + React project (this keeps dependency versions current):

   ```bash
   npm create vite@latest xauusd-bias-ui -- --template react
   cd xauusd-bias-ui
   npm install
   ```

2. Delete the template files you don't need:
   `src/App.css`, `src/index.css`, `src/assets/`, and the old `src/App.jsx` and `src/main.jsx`.

3. Copy everything from this download into the project, replacing files when asked:
   `index.html`, `vite.config.js`, `.env.example`, and the whole `src/` folder.

4. Start it:

   ```bash
   npm run dev
   ```

   Open the address Vite prints (usually http://localhost:5173).

You will see demo data with a Bullish / Bearish / Mixed switch so you can check all three states.

## Connecting the C# backend later

- Your API should answer `GET /api/bias/today` with JSON shaped like `src/data/mockBias.js`
  (fields: `asOf`, `bias`, `score`, `strength`, `confidence`, `summary`,
  `factors[]`, `upcomingEvents[]`, `history[]`).
- Copy `.env.example` to `.env.local` and set `VITE_USE_MOCK=false`.
- In `vite.config.js`, set the proxy `target` to your ASP.NET Core port.
  Also enable CORS in ASP.NET Core if you serve the built site from another origin.

## Structure

```
src/
  api/biasApi.js          fetch layer (mock or real)
  data/mockBias.js        demo data and the API contract
  components/             BiasHero, FactorList, EventsList, History
  App.jsx                 page, loading and error states
  styles.css              all styling
```
