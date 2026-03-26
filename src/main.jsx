import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";       // mount container (pages imported inside)
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Complaint from "./pages/Complaint.jsx";
import Vote from "./pages/vote";
import Task from "./vendor/Task.jsx"
import VendorRegister from "./vendor/VendorRegister.jsx";
import VendorLogin from "./vendor/VendorLogin.jsx";
import VendorDashboard from "./vendor/VendorDashboard.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';


// All routes defined here
const router = createBrowserRouter([
  
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  {path:'/complaint',element:<Complaint/>},
  {path:'/votes',element:<Vote/>},
  {path:'/task',element:<Task/>},
  {path:'/vendorregis',element:<VendorRegister/>},
  {path:'/vendorlogin',element:<VendorLogin/>},
  {path:'/vendorDashboard',element:<VendorDashboard/>}

]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />                {/* pages mounted here */}
    <RouterProvider router={router} />  {/* handles routing */}
  </StrictMode>
);

