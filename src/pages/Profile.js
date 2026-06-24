import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const saved = JSON.parse(localStorage.getItem("portfolioData") || "{}");

  const fullName     = saved.fullName     || "";
  const profTitle    = saved.profTitle    || "";
  const aboutMe      = saved.aboutMe      || "";
  const yearsExp     = saved.yearsExp     || "";
  const location     = saved.location     || "";
  const skills       = saved.skills       || [];
  const projects     = saved.projects     || [];
  const degree       = saved.degree       || "";
  const institution  = saved.institution  || "";
  const startYear    = saved.startYear    || "";
  const endYear      = saved.endYear      || "";
  const cgpa         = saved.cgpa         || "";
  const contactEmail = saved.contactEmail || currentUser?.email || "";
  const phone        = saved.phone        || "";
  const linkedin     = saved.linkedin     || "";
  const github       = saved.github       || "";
  const website      = saved.website      || "";
  const photo        = saved.photo        || null;

  const userInitials = currentUser?.email
    ? currentUser.email.slice(0, 2).toUpperCase()
    : "AS";

  const hasPortfolio = fullName || profTitle;

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-container">

        {/* Top Card */}
        <div className="profile-top-card">
          {photo ? (
            <img src={photo} alt="Profile" style={{ width: "90px", height: "90px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          ) : (
            <div className="profile-big-avatar">{userInitials}</div>
          )}
          <div className="profile-top-info">
            <h1 className="profile-name">{fullName || "Your Name"}</h1>
            <p className="profile-title">{profTitle || "Your Title"}</p>
            {location && <p className="profile-meta">📍 {location} &nbsp;|&nbsp; 💼 {yearsExp} years experience</p>}
            <p className="profile-email">✉️ {contactEmail}</p>
          </div>
          <div className="profile-top-actions">
            <button className="btn-edit-profile" onClick={() => navigate("/portfolio-builder", { state: { edit: true } })}>
              ✏️ Edit Portfolio
            </button>
            <button className="btn-logout" onClick={() => setShowLogout(true)}>
              🚪 Logout
            </button>
          </div>
        </div>

        {/* No portfolio yet */}
        {!hasPortfolio && (
          <div className="profile-section-card" style={{ textAlign: "center", padding: "40px" }}>
            <p style={{ color: "#6b7280", fontSize: "16px", marginBottom: "20px" }}>
              You haven't created your portfolio yet.
            </p>
            <button className="btn-edit-profile" onClick={() => navigate("/portfolio-builder")}>
              + Create Portfolio
            </button>
          </div>
        )}

        {/* About */}
        {aboutMe && (
          <div className="profile-section-card">
            <h2 className="profile-section-heading">👤 About Me</h2>
            <p className="profile-about-text">{aboutMe}</p>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="profile-section-card">
            <h2 className="profile-section-heading">💡 Skills</h2>
            <div className="profile-skills-wrap">
              {skills.map((s, i) => (
                <span key={i} className="profile-skill-chip">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && projects[0]?.name && (
          <div className="profile-section-card">
            <h2 className="profile-section-heading">🚀 Projects</h2>
            {projects.map((proj, i) => (
              proj.name && (
                <div key={i} className="profile-project-card">
                  <div className="profile-project-header">
                    <h3 className="profile-project-name">{proj.name}</h3>
                    <div className="profile-project-links">
                      {proj.url && <a href={proj.url} target="_blank" rel="noreferrer" className="profile-link">🔗 Live Demo</a>}
                      {proj.github && <a href={proj.github} target="_blank" rel="noreferrer" className="profile-link">🐙 GitHub</a>}
                    </div>
                  </div>
                  {proj.description && <p className="profile-project-desc">{proj.description}</p>}
                  {proj.tech && (
                    <div className="profile-project-tech">
                      {proj.tech.split(",").map((t, j) => (
                        <span key={j} className="profile-tech-tag">{t.trim()}</span>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {degree && (
          <div className="profile-section-card">
            <h2 className="profile-section-heading">🎓 Education</h2>
            <div className="profile-edu-card">
              <h3 className="profile-edu-degree">{degree}</h3>
              <p className="profile-edu-institution">{institution}</p>
              <p className="profile-edu-meta">{startYear} – {endYear} &nbsp;|&nbsp; CGPA: {cgpa}</p>
            </div>
          </div>
        )}

        {/* Contact */}
        {(phone || linkedin || github || website) && (
          <div className="profile-section-card">
            <h2 className="profile-section-heading">📬 Contact</h2>
            <div className="profile-contact-grid">
              {phone && <p>📞 {phone}</p>}
              {linkedin && <a href={linkedin} target="_blank" rel="noreferrer" className="profile-link">🔗 LinkedIn</a>}
              {github && <a href={github} target="_blank" rel="noreferrer" className="profile-link">🐙 GitHub</a>}
              {website && <a href={website} target="_blank" rel="noreferrer" className="profile-link">🌐 Website</a>}
            </div>
          </div>
        )}

      </div>

      {/* Logout Modal */}
      {showLogout && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Logout?</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="btn-cancel-modal" onClick={() => setShowLogout(false)}>Cancel</button>
              <button className="btn-confirm-logout" onClick={handleLogout}>Yes, Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;