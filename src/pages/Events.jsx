import { useState, useEffect } from "react";
import { fetchEvents } from "../api/ticketmaster";
import EventCard from "../components/EventCard";
function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
        try{
            const data = await fetchEvents({countryCode: "US"});
            setEvents(data);
        }
        catch(err){
            setError(err.message);
        }

        finally{
            setLoading(false);
        }
    }
    loadData();
  }, []);
  let content;
  if (loading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = <p className="error">{error}</p>;
  } else if (events.length === 0) {
    content = <p>No Events Found</p>;
  } else {
    content = (
      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    );
  }
  return(
    <div>
        <h1>Events</h1>
        <>{content}</>
    </div>
  );
}
export default Events;
