import { Routes, Route, Navigate, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddJob from "./pages/AddJob.jsx";
import JobDetails from "./pages/JobDetails.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddJob />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route
            path="*"
            element={
              <div className="card">
                <h2>Page not found</h2>
                <p>Try the dashboard.</p>
                <Link className="btn" to="/dashboard">Go to Dashboard</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
