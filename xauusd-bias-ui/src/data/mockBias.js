// Demo data only. Every reason below is placeholder text, not a real market read.
// The shape of this object is the contract your C# API should return from
// GET /api/bias/today. Keep the field names identical and the React code
// will work unchanged.

const hoursFromNow = (h) => new Date(Date.now() + h * 3600 * 1000).toISOString();
const daysAgo = (d) => new Date(Date.now() - d * 86400 * 1000).toISOString();

function build({ bias, strength, confidence, summary, factors, history }) {
  // Overall score runs from -100 (fully bearish) to +100 (fully bullish).
  const score =
    Math.round(factors.reduce((sum, f) => sum + f.score * f.weight, 0) * 100) || 0; // `|| 0` avoids "-0"
  return {
    asOf: new Date().toISOString(),
    bias,
    score,
    strength,
    confidence,
    summary,
    factors,
    upcomingEvents: [
      { time: hoursFromNow(5), title: "FOMC member speech", impact: "Medium" },
      { time: hoursFromNow(22), title: "US CPI (YoY)", impact: "High" },
      { time: hoursFromNow(46), title: "US jobless claims", impact: "Low" },
    ],
    history,
  };
}

const hist = (items) =>
  items.map(([bias, strength], i) => ({
    date: daysAgo(items.length - i),
    bias,
    strength,
  }));

export const scenarios = {
  Bullish: build({
    bias: "Bullish",
    strength: 66,
    confidence: "Medium",
    summary:
      "Demo: all three factors lean the same way, so the bias is bullish. Monetary policy and geopolitics carry most of the weight, and reserve buying adds a slower supporting trend.",
    factors: [
      {
        id: "monetary",
        name: "Monetary policy",
        direction: "bullish",
        score: 0.5,
        weight: 0.45,
        reason:
          "Placeholder: real yields have drifted lower and rate-cut expectations have risen over the past week.",
        sources: [{ title: "FRED: 10-year real yield", publisher: "St. Louis Fed" }],
      },
      {
        id: "geopolitics",
        name: "Geopolitical news",
        direction: "bullish",
        score: 0.7,
        weight: 0.3,
        reason:
          "Placeholder: tension headlines have increased in volume and tone has turned more negative.",
        sources: [{ title: "Wire headlines, last 24 hours", publisher: "News API" }],
      },
      {
        id: "reserves",
        name: "Central bank gold buying",
        direction: "bullish",
        score: 0.6,
        weight: 0.25,
        reason:
          "Placeholder: official-sector buying has stayed positive over the latest three reported months.",
        sources: [{ title: "Central bank statistics", publisher: "World Gold Council" }],
      },
    ],
    history: hist([
      ["Mixed", 31],
      ["Bullish", 48],
      ["Bullish", 55],
      ["Mixed", 28],
      ["Bearish", 44],
      ["Bullish", 52],
      ["Bullish", 61],
    ]),
  }),

  Bearish: build({
    bias: "Bearish",
    strength: 58,
    confidence: "Medium",
    summary:
      "Demo: policy expectations are the main drag. Geopolitical demand is quiet, and only reserve buying offers some support.",
    factors: [
      {
        id: "monetary",
        name: "Monetary policy",
        direction: "bearish",
        score: -0.9,
        weight: 0.45,
        reason:
          "Placeholder: real yields are rising and markets are pricing fewer cuts than last week.",
        sources: [{ title: "FRED: 10-year real yield", publisher: "St. Louis Fed" }],
      },
      {
        id: "geopolitics",
        name: "Geopolitical news",
        direction: "neutral",
        score: -0.1,
        weight: 0.3,
        reason: "Placeholder: no new escalation in the past 24 hours; headline tone is calm.",
        sources: [{ title: "Wire headlines, last 24 hours", publisher: "News API" }],
      },
      {
        id: "reserves",
        name: "Central bank gold buying",
        direction: "bullish",
        score: 0.3,
        weight: 0.25,
        reason:
          "Placeholder: buying continues but at a slower pace than the previous quarter.",
        sources: [{ title: "Central bank statistics", publisher: "World Gold Council" }],
      },
    ],
    history: hist([
      ["Bullish", 52],
      ["Mixed", 30],
      ["Bearish", 41],
      ["Bearish", 49],
      ["Mixed", 25],
      ["Bearish", 53],
      ["Bearish", 57],
    ]),
  }),

  Mixed: build({
    bias: "Mixed",
    strength: 22,
    confidence: "Low",
    summary:
      "Demo: the factors point in different directions and roughly cancel out. Treat the fundamental backdrop as unclear and lean on your technical structure.",
    factors: [
      {
        id: "monetary",
        name: "Monetary policy",
        direction: "bearish",
        score: -0.4,
        weight: 0.45,
        reason:
          "Placeholder: a firm data surprise lifted yields and trimmed cut expectations.",
        sources: [{ title: "FRED: 2-year yield", publisher: "St. Louis Fed" }],
      },
      {
        id: "geopolitics",
        name: "Geopolitical news",
        direction: "bullish",
        score: 0.6,
        weight: 0.3,
        reason: "Placeholder: renewed tension headlines are adding safe-haven demand.",
        sources: [{ title: "Wire headlines, last 24 hours", publisher: "News API" }],
      },
      {
        id: "reserves",
        name: "Central bank gold buying",
        direction: "neutral",
        score: 0.0,
        weight: 0.25,
        reason: "Placeholder: reported official buying is flat month over month.",
        sources: [{ title: "Central bank statistics", publisher: "World Gold Council" }],
      },
    ],
    history: hist([
      ["Bullish", 60],
      ["Bullish", 47],
      ["Mixed", 29],
      ["Bearish", 38],
      ["Mixed", 24],
      ["Mixed", 20],
      ["Bearish", 35],
    ]),
  }),
};
