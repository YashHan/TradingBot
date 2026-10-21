const MAX_CONTRIBUTION = 0.5; // a bar fills fully at this contribution

function directionLabel(direction) {
  if (direction === "bullish") return "Bullish";
  if (direction === "bearish") return "Bearish";
  return "Neutral";
}

export default function FactorList({ factors }) {
  return (
    <section className="panel" aria-labelledby="factors-heading">
      <h2 id="factors-heading" className="panel-title">
        What is driving the bias
      </h2>
      <ul className="factors">
        {factors.map((factor) => {
          const contribution = factor.score * factor.weight;
          const width = Math.min(Math.abs(contribution) / MAX_CONTRIBUTION, 1) * 50;
          const side = contribution >= 0 ? "right" : "left";
          const shown = `${contribution >= 0 ? "+" : "-"}${Math.abs(contribution).toFixed(2)}`;

          return (
            <li key={factor.id} className="factor">
              <div className="factor-head">
                <h3>{factor.name}</h3>
                <span className={`tag tag-${factor.direction}`}>
                  {directionLabel(factor.direction)}
                </span>
              </div>

              <div
                className="contribution"
                role="img"
                aria-label={`Contribution ${shown}, weight ${Math.round(factor.weight * 100)} percent`}
              >
                <span className="contribution-center" />
                <span
                  className={`contribution-fill fill-${factor.direction} ${side}`}
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="factor-meta">
                Contribution {shown}, weight {Math.round(factor.weight * 100)}%
              </p>

              <p className="factor-reason">{factor.reason}</p>

              {factor.sources?.length > 0 && (
                <ul className="sources">
                  {factor.sources.map((s) => (
                    <li key={s.title}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.title}
                        </a>
                      ) : (
                        s.title
                      )}
                      , {s.publisher}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
