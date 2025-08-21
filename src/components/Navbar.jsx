import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="brand">JobTrackr</h1>

        {/* Hamburger button */}
        <button
          className="hamburger"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        <nav className={`nav ${open ? "nav-open" : ""}`}>
          <NavLink
            to="/dashboard"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/add"
            className="nav-link btn-primary"
            onClick={() => setOpen(false)}
          >
            Add Job
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
