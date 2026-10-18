import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="events-page">
      <h1>Page not found</h1>
      <p className="events-message">
        The page you are looking for does not exist.{" "}
        <Link to="/events">Back to events</Link>
      </p>
    </main>
  );
}

export default NotFound;