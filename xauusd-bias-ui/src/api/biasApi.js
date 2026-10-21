import { scenarios } from "../data/mockBias.js";

// Set VITE_USE_MOCK=false in .env.local to call the real C# API instead.
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";
export const SCENARIOS = Object.keys(scenarios);

export async function getTodayBias(scenario = "Bullish") {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 400)); // simulate network
    return structuredClone(scenarios[scenario]);
  }

  const response = await fetch("/api/bias/today", {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`The server answered with status ${response.status}.`);
  }
  return response.json();
}
