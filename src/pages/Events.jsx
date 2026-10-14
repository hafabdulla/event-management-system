import { useEffect } from "react";
import { fetchEvents } from "../api/ticketmaster";
function Events() {
  useEffect(() => {
    fetchEvents({ countryCode: "US" })
    .then((events)=>console.log(events))
    .catch((error)=> console.log(error.message));
  }, []);
  return (
    <div>
      <h1>Events</h1>
    </div>
  );
}

export default Events;
