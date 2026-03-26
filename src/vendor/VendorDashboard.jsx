import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function VendorDashboard() {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("vendorName");
    if (!name) {
      navigate("/vendorLogin");
    } else {
      setVendorName(name);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/vendorLogin");
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="bg-success text-white p-4"
        style={{
          width: "250px",
          borderTopRightRadius: "25px",
          borderBottomRightRadius: "25px",
          boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h4 className="mb-4 text-center">Vendor Panel</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#overview" className="nav-link text-white">
              📊 Overview
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#orders" className="nav-link text-white">
              📦 Orders
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#requests" className="nav-link text-white">
              🧾 Requests
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#profile" className="nav-link text-white">
              👤 Profile
            </a>
          </li>
          <li className="nav-item mt-4">
            <button
              onClick={handleLogout}
              className="btn btn-light text-success w-100 fw-bold"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        {/* Top Bar */}
        <div
          className="d-flex justify-content-between align-items-center bg-white p-3 rounded shadow-sm mb-4"
          style={{ borderRadius: "10px" }}
        >
          <h5 className="m-0">Welcome, <span className="text-success fw-bold">{vendorName}</span></h5>
          <button
            onClick={handleLogout}
            className="btn btn-outline-success btn-sm"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <h5 className="card-title text-success">Total Orders</h5>
                <h2 className="fw-bold">124</h2>
                <p className="text-muted">Completed this month</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <h5 className="card-title text-success">Pending Requests</h5>
                <h2 className="fw-bold">8</h2>
                <p className="text-muted">Awaiting confirmation</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
              <div className="card-body text-center">
                <h5 className="card-title text-success">Earnings</h5>
                <h2 className="fw-bold">₹42,500</h2>
                <p className="text-muted">This month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section (placeholder for future use) */}
        <div
          id="overview"
          className="mt-5 bg-white p-4 rounded shadow-sm"
          style={{ borderRadius: "15px" }}
        >
          <h5 className="mb-3 text-success fw-bold">Performance Overview</h5>
          <p className="text-muted">
            You can integrate charts or analytics here later (e.g., using Recharts or Chart.js).
          </p>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
