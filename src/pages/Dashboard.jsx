// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "User";

  const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1470&q=80";

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      {/* Navbar with Offcanvas for small screens */}
      <nav className="navbar navbar-dark bg-dark bg-opacity-75">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Smart Community</span>

          {/* Hamburger Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Offcanvas Navbar */}
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title">Menu</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    onClick={() => navigate("/complaint")}
                  >
                    Complaints
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    onClick={() => navigate("/votes")}
                  >
                    Votes
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link text-white"
                    onClick={() => navigate("/task")}
                  >
                    Task
                  </button>
                </li>
                <li className="nav-item mt-2">
                  <button
                    className="btn btn-outline-light w-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Desktop links (hidden on small screens) */}
          <div className="d-none d-lg-flex ms-auto">
            <button className="btn btn-link text-white" onClick={() => navigate("/")}>Home</button>
            <button className="btn btn-link text-white" onClick={() => navigate("/complaint")}>Complaints</button>
            <button className="btn btn-link text-white" onClick={() => navigate("/votes")}>Votes</button>
            <button className="btn btn-link text-white" onClick={() => navigate("/task")}>Task</button>
            <button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className="container my-auto text-center">
        <h1 className="display-4 fw-bold text-shadow mt-5">Welcome, {username}!</h1>
        <p className="lead text-shadow">Explore your Smart Community Portal</p>

        {/* Services Cards */}
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 mb-4">
            <div className="card shadow-lg bg-dark bg-opacity-50 h-100 text-white border-0">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Complaint Service</h5>
                <p className="card-text text-center">
                  Submit and track complaints in your community.
                </p>
                <button className="btn btn-primary mt-2" onClick={() => navigate("/complaint")}>Go</button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-lg bg-dark bg-opacity-50 h-100 text-white border-0">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 className="card-title">Voting Service</h5>
                <p className="card-text text-center">
                  Participate in community polls and votes.
                </p>
                <button className="btn btn-primary mt-2" onClick={() => navigate("/votes")}>Go</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-3 bg-dark bg-opacity-75 text-center text-white">
        © 2025 Smart Community. All rights reserved.
      </footer>
    </div>
  );
}
export default Dashboard;
