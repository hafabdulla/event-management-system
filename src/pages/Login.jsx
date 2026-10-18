import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../store/authSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { validateEmail } from "../utils/validation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const redirectTo = from ? from.pathname + from.search : "/events";
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  // Don't show an error left over from another page (e.g. a failed Register).
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(login({ email, password }));
  }

  return (
    <div>
      <h1>Login</h1>
      {from && <p>Please log in to continue.</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register" state={location.state}>Register</Link>
      </p>
    </div>
  );
}

export default Login;