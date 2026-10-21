const dayFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  day: "numeric",
});

export default function History({ history }) {
  return (
    <section className="panel" aria-labelledby="history-heading">
      <h2 id="history-heading" className="panel-title">
        Last 7 days
      </h2>
      {history.length === 0 ? (
        <p className="empty">History will appear after the first few daily runs.</p>
      ) : (
        <ul className="history">
          {history.map((day) => (
            <li key={day.date}>
              <span className="history-day">{dayFormatter.format(new Date(day.date))}</span>
              <span className={`tag tag-${day.bias.toLowerCase()}`}>{day.bias}</span>
              <span className="history-strength">{day.strength}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
