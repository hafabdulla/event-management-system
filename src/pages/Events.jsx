import { useState, useEffect } from "react";
import { fetchEvents } from "../api/ticketmaster";
import EventCard from "../components/EventCard";

const categories = ["Music", "Sports", "Arts and Theatre", "Film", "Miscellaneous"]

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [category, setCategory] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 500);
    return() => clearTimeout(timer);
  }, [search])

  useEffect(() => {

    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError("");
        const data = await fetchEvents({
          countryCode: "US",
          keyword: debouncedSearch,
          classificationName: category,
        });
        if (!cancelled) setEvents(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Could not load events.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return() => {cancelled = true}

  }, [debouncedSearch, category]);
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p className="error events-message">{error}</p>;
  } else if (events.length === 0) {
    content = <p className="events-message">No Events Found</p>;
  } else {
    content = (
      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
  return (
    <main className="events-page">
      <h1>Discover Events</h1>
      <div className="event-filters">
        <label className="filter-field">
          <span>Search events</span>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by event name..."
          />
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
      </div>
      {content}
    </main>
  );
}
export default Events;
