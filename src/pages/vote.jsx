import React, { useEffect, useState } from "react";

const BACKEND_URL = "http://localhost:8080";

function vote() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = localStorage.getItem("auth");
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!auth) {
      alert("Please login first!");
      window.location.href = "/login";
    } else {
      fetchComplaints();
    }
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/complaints/priority`, {
        headers: {
          Authorization: "Basic " + auth,
        },
      });

      if (!response.ok) throw new Error("Failed to load complaints");
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      console.error(err);
      alert("Error loading complaints!");
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/votes/${id}`, {
        method: "POST",
        headers: { Authorization: "Basic " + auth },
      });

      if (!response.ok) throw new Error("Vote failed");
      const msg = await response.text();
      alert(msg);

      // Update vote count immediately
      updateVoteCount(id);
    } catch (err) {
      alert("Error submitting vote!");
      console.error(err);
    }
  };

  const updateVoteCount = async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/votes/count/${id}`, {
        headers: { Authorization: "Basic " + auth },
      });
      if (!response.ok) throw new Error("Count update failed");
      const count = await response.text();

      // Update locally
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, voteCount: count } : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-start justify-content-center text-dark"
      style={{
        backgroundImage: "url('/images/commu.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "2rem 1rem",
      }}
    >
      <div
        className="container bg-white bg-opacity-75 rounded-4 shadow-lg p-4"
        style={{
          maxWidth: "900px",
          backdropFilter: "blur(12px)",
        }}
      >
        <h2 className="text-center text-primary fw-bold mb-4">
          Vote on Community Complaints
        </h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 fw-semibold">Loading complaints...</p>
          </div>
        ) : complaints.length === 0 ? (
          <p className="text-center">No complaints available for voting.</p>
        ) : (
          complaints.map((c) => (
            <div
              key={c.id}
              className="p-4 mb-4 rounded-4 shadow-sm bg-light"
              style={{
                boxShadow:
                  "0 4px 12px rgba(0,114,255,0.2), inset 0 0 10px rgba(255,255,255,0.5)",
                transition: "transform 0.2s, box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 6px 18px rgba(0,114,255,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,114,255,0.2)")
              }
            >
              <h5 className="fw-bold text-primary mb-2">
                {c.title} <small className="text-muted">({c.category})</small>
              </h5>
              <p className="mb-2">{c.description}</p>
              <small className="text-secondary d-block mb-2">
                Votes: <strong>{c.voteCount}</strong> | Raised By:{" "}
                <em>{c.raisedBy}</em>
              </small>
              <button
                className="btn btn-primary fw-semibold px-4 rounded-3 shadow"
                onClick={() => handleVote(c.id)}
              >
                Vote
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default vote;
