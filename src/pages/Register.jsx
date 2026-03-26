import React, { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);

    try {
      const response = await fetch("http://localhost:8080/regis", {
        method: "POST",
        body: params,
      });

      const result = await response.text(); // backend returns plain text
      setMessage(result);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Registration failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "22rem", borderRadius: "15px" }}>
        <h3 className="text-center mb-3 text-primary">User Registration</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>

        {message && (
          <div className="alert alert-info text-center mt-3 p-2" role="alert">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;
