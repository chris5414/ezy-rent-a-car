import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confirmAlert from "react-confirm-alert";

const Register = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "", contact: "" });

  function handleChange(event) {
    event.preventDefault();
    const { id, value } = event.target;
    setInput({ ...input, [id]: value });
  }

  async function signupUser(event) {
    event.preventDefault();

    try {
      setInput({ email: "", password: "", contact: "" });
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      };
      const response = await fetch(
        "http://localhost:5001/auth/register",
        requestOptions
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="d-flex flex-row justify-content-between align-items-center container-sm"
      style={{ marginTop: "24vh" }}
    >
      <div
        id="signup"
        className="d-flex flex-column align-items-center container-md "
        style={{ maxWidth: "450px" }}
      >
        <form onSubmit={signupUser}>
          <div className="input-group mb-3">
            <div className="form-floating">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="user@email.com"
                value={input.email}
                onChange={handleChange}
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>
          </div>
          <div className="input-group">
            <span
              className="input-group-text"
              style={{ cursor: "pointer" }}
            ></span>
            <div className="form-floating">
              <input
                // type={inputType}
                type="password"
                id="password"
                className="form-control"
                placeholder="password"
                value={input.password}
                onChange={handleChange}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>
          </div>
          <div className="form-floating">
            <input
              type="text"
              name="contact"
              id="contact"
              className="form-control"
              placeholder="contact number"
              value={input.contact}
              onChange={handleChange}
            />
            <label htmlFor="contact" className="form-label">
              contact
            </label>
          </div>

          <div className="input-group mb-3">
            <button type="submit" className="btn btn-secondary w-100 mt-4">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
