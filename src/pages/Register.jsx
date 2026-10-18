import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../store/authSlice";
import { useNavigate, useLocation } from "react-router-dom";
import {
  validateName,
  validateEmail,
  validateNewPassword,
  validateConfirmPassword,
} from "../utils/validation";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const redirectTo = from ? from.pathname + from.search : "/events";
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

  // Don't show an error left over from another page (e.g. a failed Login).
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  function handleSubmit(e) {
    e.preventDefault();

    const found = {
      name: validateName(name),
      email: validateEmail(email),
      password: validateNewPassword(password),
      confirm: validateConfirmPassword(password, confirm),
    };
    // keep only the fields that actually have a message
    const newErrors = Object.fromEntries(
      Object.entries(found).filter(([, message]) => message)
    );

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(register({ name, email, password }));
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

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

        <div>
          <label htmlFor="confirm">Confirm password</label>
          <input
            id="confirm"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            aria-invalid={Boolean(errors.confirm)}
          />
          {errors.confirm && <p className="error">{errors.confirm}</p>}
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;