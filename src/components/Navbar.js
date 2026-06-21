import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const userInitials = currentUser?.email
    ? currentUser.email.slice(0, 2).toUpperCase()
    : "AS";

  const links = [
    { label: "Home", path: "/home" },
    { label: "Browse", path: "/browse" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">PortfolioHub</div>
      <div className="nav-links">
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={`nav-link ${location.pathname === l.path ? "active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Avatar click → profile page সবসময় */}
      <div
        className="nav-user"
        onClick={() => navigate("/profile")}
        title="View my profile"
        style={{ cursor: "pointer" }}
      >
        <div className="user-avatar">{userInitials}</div>
        <span className="user-name">AnnaSweety</span>
      </div>
    </nav>
  );
}

export default Navbar;