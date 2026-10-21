export default function BiasHero({ data }) {
  const tone = data.bias.toLowerCase();
  const position = Math.min(100, Math.max(0, (data.score + 100) / 2));
  const signed = data.score > 0 ? `+${data.score}` : `${data.score}`;

  return (
    <section className={`hero tone-${tone}`} aria-labelledby="bias-heading">
      <div className="hero-top">
        <h2 id="bias-heading" className="hero-bias">
          {data.bias}
        </h2>
        <dl className="hero-stats">
          <div>
            <dt>Strength</dt>
            <dd>
              {data.strength}
              <span className="unit">/100</span>
            </dd>
          </div>
          <div>
            <dt>Confidence</dt>
            <dd>{data.confidence}</dd>
          </div>
        </dl>
      </div>

      <div
        className="gauge"
        role="img"
        aria-label={`Bias score ${signed} on a scale from minus 100 bearish to plus 100 bullish`}
      >
        <div className="gauge-track">
          <span className="seg seg-bear" />
          <span className="seg seg-mixed" />
          <span className="seg seg-bull" />
          <span className="gauge-marker" style={{ left: `${position}%` }}>
            <span className="gauge-score">{signed}</span>
          </span>
        </div>
        <div className="gauge-scale" aria-hidden="true">
          <span>Bearish</span>
          <span>Mixed</span>
          <span>Bullish</span>
        </div>
      </div>

      <p className="hero-summary">{data.summary}</p>
      <p className="hero-note">
        Strength shows how strongly the factors agree. The marker shows the direction and size of the combined score.
      </p>
    </section>
  );
}
