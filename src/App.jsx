import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/authSlice";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import MyEvents from "./pages/MyEvents";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <div>
      <nav>
        <Link to="/events">Events</Link>
        <Link to="/my-events">My Events</Link>
        {user ? (
          <div>
            <span>{user.name}</span>
            <button onClick={() => dispatch(logout())}>Logout</button>
          </ div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </ div>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEvents />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;