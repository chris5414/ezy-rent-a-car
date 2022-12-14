import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      console.log(user);
      // if (user.user.isAdmin) navigate("/create");
      // else navigate("/");
      navigate("/");
    } catch (err) {
      console.log(err.response);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  console.log(user);

  return (
    <div className="login">
      <div className="container">
        <h1>User Login</h1>
        <input
          className="inputEmail"
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="inputPassword"
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className="button" onClick={handleClick}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
