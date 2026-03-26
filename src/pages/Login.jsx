import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const BACKEND_URL = "http://localhost:8080";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/getusers`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      });

      if (response.ok) {
        // Login success
        localStorage.setItem("auth", btoa(username + ":" + password));
        localStorage.setItem("username", username);
        navigate("/dashboard"); // redirect to dashboard
      } else if (response.status === 401) {
        setError("Invalid credentials!");
      } else {
        setError("Login failed, please try again.");
      }
    } catch (err) {
      setError("Server error!");
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem", borderRadius: "15px" }}>
        <h3 className="text-center mb-3 text-primary">Smart Community Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
      </div>
    </div>
  );
}

export default Login;
