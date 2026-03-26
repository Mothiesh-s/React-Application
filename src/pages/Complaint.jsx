import React, { useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:8080";

function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(true);

  const storedAuth = localStorage.getItem("auth");
  const authHeader = "Basic " + storedAuth;

  const navigateToLogin = () => {
    alert("Please login first.");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!storedAuth) navigateToLogin();
    else loadMyComplaints();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, category, email } = form;
    if (!title || !description || !category || !email) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const formData = new URLSearchParams();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("email", email.trim());

      const response = await fetch(`${BACKEND_URL}/complaints/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: authHeader,
        },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error("Failed to submit complaint");

      const result = await response.text();
      alert(result);
      setForm({ title: "", description: "", category: "", email: "" });
      loadMyComplaints();
    } catch (err) {
      alert("Error submitting complaint. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMyComplaints = async () => {
    setShowDelete(true);
    try {
      const res = await fetch(`${BACKEND_URL}/complaints/my`, {
        headers: { Authorization: authHeader },
      });
      if (!res.ok) throw new Error("Failed to load complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      alert("Error loading your complaints.");
      console.error(err);
    }
  };

  const loadTopComplaints = async () => {
    setShowDelete(false);
    try {
      const res = await fetch(`${BACKEND_URL}/complaints/priority`, {
        headers: { Authorization: authHeader },
      });
      if (!res.ok) throw new Error("Failed to load top complaints");
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      alert("Error loading top voted complaints.");
      console.error(err);
    }
  };

  const deleteComplaint = async (id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      try {
        const res = await fetch(`${BACKEND_URL}/complaints/${id}`, {
          method: "DELETE",
          headers: { Authorization: authHeader },
        });

        if (!res.ok) throw new Error("Delete failed");

        const msg = await res.text();
        alert(msg);
        loadMyComplaints();
      } catch (err) {
        alert("Error deleting complaint.");
        console.error(err);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start min-vh-100 py-5"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1581092580563-1e7f9081b5c1?auto=format&fit=crop&w=1950&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="container bg-light bg-opacity-95 rounded-4 shadow-lg p-4"
        style={{ maxWidth: "900px" }}
      >
        <h2 className="text-center fw-bold text-primary mb-4">
          Complaint Services
        </h2>

        {/* Form Section */}
        <form className="row g-3 mb-4" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <input
              id="title"
              type="text"
              className="form-control border-primary rounded-3"
              placeholder="Complaint Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              id="category"
              className="form-select border-primary rounded-3"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Water">Water</option>
              <option value="Electricity">Electricity</option>
              <option value="Security">Security</option>
              <option value="Sanitation">Sanitation</option>
            </select>
          </div>
          <div className="col-12">
            <textarea
              id="description"
              className="form-control border-primary rounded-3"
              rows="3"
              placeholder="Complaint Description"
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="col-12">
            <input
              id="email"
              type="email"
              className="form-control border-primary rounded-3"
              placeholder="Enter Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button
              type="submit"
              className="btn btn-primary w-100 fw-bold rounded-3 py-2 shadow"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Complaint"}
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="d-flex flex-wrap justify-content-between mb-4 gap-2">
          <button
            className="btn btn-dark flex-fill fw-semibold"
            onClick={loadMyComplaints}
          >
            My Complaints
          </button>
          <button
            className="btn btn-secondary flex-fill fw-semibold"
            onClick={loadTopComplaints}
          >
            Top Voted Complaints
          </button>
        </div>

        {/* Complaints List */}
        <div
          className="p-2 rounded-3"
          style={{
            maxHeight: "450px",
            overflowY: "auto",
            background: "rgba(255, 255, 255, 0.9)",
          }}
        >
          {complaints.length === 0 ? (
            <p className="text-center text-muted">No complaints found.</p>
          ) : (
            complaints.map((c) => (
              <div
                key={c.id}
                className="p-3 mb-3 rounded-4 shadow-sm bg-light border-start border-5 border-primary position-relative"
              >
                <strong className="d-block text-primary fs-5">
                  {c.title}{" "}
                  <small className="text-dark">({c.category})</small>
                </strong>
                <p className="mb-1">{c.description}</p>
                <small className="text-muted">
                  Votes: {c.voteCount || 0} | Status: {c.status || "N/A"} | Raised
                  By: {c.raisedBy || "Unknown"}
                </small>
                {showDelete && (
                  <button
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 fw-bold"
                    onClick={() => deleteComplaint(c.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Complaint;
