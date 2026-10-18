import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { cancelRegistration } from "../store/registrationsSlice";

function getToday() {
    return new Date().toISOString().slice(0, 10);
}

function MyEvents() {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.auth.user);
    const items = useSelector((s) => s.registrations.items);

    if (!user) {
        return (
            <main className="events-page">
                <h1>My Events</h1>
                <p className="events-message">
                    Please log in to see your events. <Link to="/login">Log in</Link>
                </p>
            </main>
        );
    }

    const mine = items.filter((r) => r.userId === user.id);

    const today = getToday();
const upcoming = mine.filter((r) => !r.date || r.date >= today);
    const completed = mine.filter((r) => r.date && r.date < today);

    function renderList(list, emptyText) {
        if (list.length === 0) {
            return <p className="events-message">{emptyText}</p>;
        }
        return (
            <div className="event-grid">
                {list.map((r) => (
                    <div className="my-event" key={r.eventId}>
                        <EventCard event={r.event} />
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                dispatch(
                                    cancelRegistration({ userId: user.id, eventId: r.eventId })
                                )
                            }
                        >
                            Cancel registration
                        </button>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <main className="events-page">
            <h1>My Events</h1>

            <section>
                <h2>Upcoming events</h2>
                {renderList(upcoming, "No upcoming events")}
            </section>

            <section>
                <h2>Completed events</h2>
                {renderList(completed, "No completed events")}
            </section>
        </main>
    );
}

export default MyEvents;