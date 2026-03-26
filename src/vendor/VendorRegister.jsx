import React, { useState } from "react";

function VendorRegister() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmailId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the URL with query parameters
    const url = `http://localhost:8080/vendorRegis?username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}&emailId=${encodeURIComponent(
      emailId
    )}`;

    try {
      const response = await fetch(url, { method: "POST" });

      const result = await response.text(); // backend returns plain text
      setMessage(result);
      setUsername("");
      setPassword("");
      setEmailId("");
    } catch (error) {
      console.error("Error registering vendor:", error);
      setMessage("Vendor registration failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "25rem", borderRadius: "15px" }}
      >
        <h3 className="text-center mb-3 text-success">Vendor Registration</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter vendor username"
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

          <div className="mb-3">
            <label className="form-label">Email ID</label>
            <input
              type="email"
              className="form-control"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Register Vendor
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

export default VendorRegister;
