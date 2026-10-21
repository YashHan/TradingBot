import { useCallback, useEffect, useState } from "react";
import { getTodayBias, USE_MOCK, SCENARIOS } from "./api/biasApi.js";
import BiasHero from "./components/BiasHero.jsx";
import FactorList from "./components/FactorList.jsx";
import EventsList from "./components/EventsList.jsx";
import History from "./components/History.jsx";

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scenario, setScenario] = useState("Bullish");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await getTodayBias(scenario));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [scenario]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <h1>XAUUSD fundamental bias</h1>
          {data && (
            <p className="updated">Updated {timeFormatter.format(new Date(data.asOf))}</p>
          )}
        </div>
        <button className="btn" onClick={load} disabled={loading}>
          {loading ? "Refreshing" : "Refresh"}
        </button>
      </header>

      {USE_MOCK && (
        <div className="demo-bar" role="note">
          <span>Showing demo data. Set VITE_USE_MOCK=false to use the C# API.</span>
          <div className="segmented" role="group" aria-label="Demo scenario">
            {SCENARIOS.map((name) => (
              <button
                key={name}
                aria-pressed={scenario === name}
                onClick={() => setScenario(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="error" role="alert">
          <strong>Could not load today's bias.</strong> {error} Check that the backend is running, then select Refresh.
        </div>
      )}

      {!data && loading && <p className="loading">Loading today's bias</p>}

      {data && (
        <main className={loading ? "is-refreshing" : undefined}>
          <BiasHero data={data} />
          <div className="grid">
            <FactorList factors={data.factors} />
            <aside className="side">
              <EventsList events={data.upcomingEvents} />
              <History history={data.history} />
            </aside>
          </div>
        </main>
      )}

      <footer className="footer">
        The bias is a confluence check for your market structure analysis, not a trade signal.
      </footer>
    </div>
  );
}
