import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorLogin() {
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
      // Authentication request using Basic Auth
      const response = await fetch(`${BACKEND_URL}/getusers`, {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(username + ":" + password),
        },
      });

      if (response.ok) {
        // ✅ Vendor login success
        localStorage.setItem("auth", btoa(username + ":" + password));
        localStorage.setItem("vendorName", username);

        // Redirect to vendor dashboard (you can rename this route)
        navigate("/vendorDashboard");
      } else if (response.status === 401) {
        setError("Invalid credentials! Please check your username or password.");
      } else {
        setError("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Server error! Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "22rem", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3 text-success">Vendor Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Vendor Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>

        {error && (
          <div className="alert alert-danger text-center mt-3">{error}</div>
        )}
      </div>
    </div>
  );
}

export default VendorLogin;
