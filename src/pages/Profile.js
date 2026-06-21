import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);

  const saved = JSON.parse(localStorage.getItem("portfolioData") || "{}");

  const fullName    = saved.fullName    || "Anna Parvin Sweety";
  const profTitle   = saved.profTitle   || "Full Stack Developer";
  const aboutMe     = saved.aboutMe     || "Hello! I'm Anna, a passionate Full Stack Developer with 3 years of experience.";
  const yearsExp    = saved.yearsExp    || "3";
  const location    = saved.location    || "Khulna, Bangladesh";
  const skills      = saved.skills      || ["React", "JavaScript", "Node.js", "MongoDB"];
  const projects    = saved.projects    || [{ name: "E-Commerce Platform", url: "https://example.com", description: "A full-featured e-commerce platform.", tech: "React, Node.js, MongoDB", github: "http://github.com" }];
  const degree      = saved.degree      || "BSc in Computer Science";
  const institution = saved.institution || "University of Dhaka";
  const startYear   = saved.startYear   || "2020";
  const endYear     = saved.endYear     || "2024";
  const cgpa        = saved.cgpa        || "3.75";
  const contactEmail = saved.contactEmail || currentUser?.email || "";
  const phone       = saved.phone       || "";
  const linkedin    = saved.linkedin    || "";
  const github      = saved.github      || "";
  const website     = saved.website     || "";

  const userInitials = currentUser?.email
    ? currentUser.email.slice(0, 2).toUpperCase()
    : "AS";

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-container">

        <div className="profile-top-card">
          <div className="profile-big-avatar">{userInitials}</div>
          <div className="profile-top-info">
            <h1 className="profile-name">{fullName}</h1>
            <p className="profile-title">{profTitle}</p>
            <p className="profile-meta">📍 {location} &nbsp;|&nbsp; 💼 {yearsExp} years experience</p>
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

        <div className="profile-section-card">
          <h2 className="profile-section-heading">👤 About Me</h2>
          <p className="profile-about-text">{aboutMe}</p>
        </div>

        <div className="profile-section-card">
          <h2 className="profile-section-heading">💡 Skills</h2>
          <div className="profile-skills-wrap">
            {skills.map((s, i) => (
              <span key={i} className="profile-skill-chip">{s}</span>
            ))}
          </div>
        </div>

        <div className="profile-section-card">
          <h2 className="profile-section-heading">🚀 Projects</h2>
          {projects.map((proj, i) => (
            <div key={i} className="profile-project-card">
              <div className="profile-project-header">
                <h3 className="profile-project-name">{proj.name || `Project #${i + 1}`}</h3>
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
          ))}
        </div>

        <div className="profile-section-card">
          <h2 className="profile-section-heading">🎓 Education</h2>
          <div className="profile-edu-card">
            <h3 className="profile-edu-degree">{degree}</h3>
            <p className="profile-edu-institution">{institution}</p>
            <p className="profile-edu-meta">{startYear} – {endYear} &nbsp;|&nbsp; CGPA: {cgpa}</p>
          </div>
        </div>

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

      {showLogout && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Logout করবেন?</h3>
            <p>আপনি কি সত্যিই logout করতে চান?</p>
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