import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEventsById } from "../api/ticketmaster";

function EventDetails() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    let cancelled = false;
    async function loadEventDetails() {
      try {
        setLoading(true);
        setError("");
        setEvent(null);
        const data = await fetchEventsById(id);
        if (!cancelled) {
          setEvent(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadEventDetails();
    return() => {cancelled = true}
  }, [id]);
  const venue = event?._embedded?.venues?.[0];
  const date = event?.dates?.start?.localDate;
  const time = event?.dates?.start?.localTime;
  const category = event?.classifications?.[0]?.segment?.name;
  const image = event?.images?.[0]?.url;
  const priceRange = event?.priceRanges?.[0];
  const location = [
    venue?.city?.name,
    venue?.state?.stateCode || venue?.state?.name,
    venue?.country?.name,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="event-details-page">
      <Link className="back-link" to="/events">
        ← Back to events
      </Link>
      {loading ? (
        <p>Loading event details...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : !event ? (
        <p>Event not found.</p>
      ) : (
        <article className="event-details">
          {image ? (
            <img className="event-details-image" src={image} alt={event.name} />
          ) : null}
          <div className="event-details-content">
            <span className="event-card-category">{category || "Other"}</span>
            <h1>{event.name}</h1>
            <dl className="event-details-list">
              <div>
                <dt>Date</dt>
                <dd>{date || "Date to be announced"}</dd>
              </div>
              <div>
                <dt>Time</dt>
                <dd>{time || "Time to be announced"}</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>{venue?.name || "Venue to be announced"}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{location || "Location to be announced"}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{category || "Other"}</dd>
              </div>
              {priceRange ? (
                <div>
                  <dt>Ticket price</dt>
                  <dd>
                    {priceRange.currency || ""} {priceRange.min ?? "—"}
                    {priceRange.max != null ? ` - ${priceRange.max}` : ""}
                  </dd>
                </div>
              ) : null}
            </dl>
            {event.info ? (
              <p className="event-details-info">{event.info}</p>
            ) : null}
            {event.url ? (
              <a
                className="ticket-link"
                href={event.url}
                target="_blank"
                rel="noreferrer"
              >
                Buy tickets on Ticketmaster ↗
              </a>
            ) : null}
          </div>
        </article>
      )}
    </main>
  );
}

export default EventDetails;
