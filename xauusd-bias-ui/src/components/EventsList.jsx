const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
});

export default function EventsList({ events }) {
  return (
    <section className="panel" aria-labelledby="events-heading">
      <h2 id="events-heading" className="panel-title">
        Coming up
      </h2>
      {events.length === 0 ? (
        <p className="empty">No high-impact events in the next 48 hours.</p>
      ) : (
        <ul className="events">
          {events.map((event) => (
            <li key={`${event.time}-${event.title}`}>
              <time dateTime={event.time}>{formatter.format(new Date(event.time))}</time>
              <span className="event-title">{event.title}</span>
              <span className={`impact impact-${event.impact.toLowerCase()}`}>
                {event.impact} impact
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
