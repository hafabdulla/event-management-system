import { useDispatch, useSelector } from "react-redux";
import EventCard from "../components/EventCard";
import { cancelRegistration } from "../store/registrationsSlice";
import { isPastDate } from "../utils/dates";

function MyEvents() {
    const dispatch = useDispatch();
    const user = useSelector((s) => s.auth.user);
    const items = useSelector((s) => s.registrations.items);

    const mine = items.filter((r) => r.userId === user?.id);

    // An event with no announced date can't be "completed", so it counts as upcoming.
    const upcoming = mine.filter((r) => !isPastDate(r.date));
    const completed = mine.filter((r) => isPastDate(r.date));

    function renderList(list, emptyText, canCancel) {
        if (list.length === 0) {
            return <p className="events-message">{emptyText}</p>;
        }
        return (
            <div className="event-grid">
                {list.map((r) => (
                    <div className="my-event" key={r.eventId}>
                        <EventCard event={r.event} />
                        {canCancel && (
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
                        )}
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
                {renderList(upcoming, "No upcoming events", true)}
            </section>

            <section>
                <h2>Completed events</h2>
                {renderList(completed, "No completed events", false)}
            </section>
        </main>
    );
}

export default MyEvents;