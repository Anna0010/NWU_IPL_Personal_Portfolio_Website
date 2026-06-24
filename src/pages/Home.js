import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const portfolios = [
  {
    initials: "KP", name: "Keya Parvin", role: "Full Stack Developer",
    skills: ["React", "Node.js", "MongoDB"], skillColors: ["#d4edda", "#d1ecf1", "#fff3cd"], rating: 4,
    fullProfile: {
      aboutMe: "Hi! I'm Keya Parvin, a passionate Full Stack Developer with 3 years of experience. I specialize in building scalable web applications and e-commerce platforms.",
      location: "Dhaka, Bangladesh", yearsExp: "3", contactEmail: "keya.parvin@gmail.com",
      degree: "BSc in Computer Science", institution: "University of Dhaka",
      startYear: "2018", endYear: "2022", cgpa: "3.80",
      projectList: [{ name: "E-Commerce Platform", description: "A full-featured e-commerce platform.", tech: "React, Node.js, MongoDB" }]
    }
  },
  {
    initials: "SP", name: "Shaima Parvin", role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "CSS"], skillColors: ["#fce4ec", "#e8eaf6", "#e0f7fa"], rating: 4,
    fullProfile: {
      aboutMe: "Hi! I'm Shaima Parvin, a UI/UX Designer with 2 years of experience. I love creating beautiful and user-friendly interfaces.",
      location: "Dhaka, Bangladesh", yearsExp: "2", contactEmail: "shaima.parvin@gmail.com",
      degree: "BSc in Computer Science", institution: "BUET",
      startYear: "2019", endYear: "2023", cgpa: "3.75",
      projectList: [{ name: "Portfolio Design System", description: "A complete design system for portfolio websites.", tech: "Figma, Adobe XD" }]
    }
  },
  {
    initials: "JP", name: "Jara Parvin", role: "Frontend Developer",
    skills: ["JavaScript", "HTML/CSS", "Tailwind"], skillColors: ["#fff9c4", "#fce4ec", "#e8f5e9"], rating: 4,
    fullProfile: {
      aboutMe: "Hi! I'm Jara Parvin, a Senior Frontend Developer with 4 years of experience. I specialize in React and Next.js applications.",
      location: "Dhaka, Bangladesh", yearsExp: "4", contactEmail: "jara.parvin@gmail.com",
      degree: "BSc in Software Engineering", institution: "BRAC University",
      startYear: "2017", endYear: "2021", cgpa: "3.90",
      projectList: [{ name: "Next.js Dashboard", description: "A high-performance analytics dashboard.", tech: "Next.js, TypeScript, Tailwind" }]
    }
  },
];

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const navigate = useNavigate();

  // Check if user already has a portfolio
  const hasPortfolio = localStorage.getItem("portfolioData") !== null;

  function handleSearch() {
    navigate("/browse", { state: { searchTerm, selectedSkill, selectedLevel, selectedType } });
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

  function handleCreatePortfolio() {
    if (hasPortfolio) {
      // Already has portfolio → go to edit
      navigate("/portfolio-builder", { state: { edit: true } });
    } else {
      // No portfolio yet → create new
      navigate("/portfolio-builder");
    }
  }

  return (
    <div className="home-page">
      <Navbar />
      <section className="hero-section">
        <h1 className="hero-title">Find The Perfect Portfolio</h1>
        <p className="hero-sub">Search thousands of talented professionals by their skills</p>
        <div className="search-bar-wrapper">
          <input type="text" className="search-input"
            placeholder="Search by skills (e.g., React, UI/UX Design, Python)"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} />
          <span className="search-icon" style={{ cursor: "pointer" }} onClick={handleSearch}>🔍</span>
        </div>
        <div className="filter-row">
          <select className="filter-select" value={selectedSkill} onChange={e => setSelectedSkill(e.target.value)}>
            <option value="">All Skills ▼</option>
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Figma">Figma</option>
            <option value="Node.js">Node.js</option>
            <option value="CSS">CSS</option>
          </select>
          <select className="filter-select" value={selectedLevel} onChange={e => setSelectedLevel(e.target.value)}>
            <option value="">Experience Level ▼</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
          <select className="filter-select" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
            <option value="">Project Type ▼</option>
            <option value="Web">Web</option>
            <option value="Mobile">Mobile</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>
        <div className="hero-buttons">
          <button className="search-btn" onClick={handleSearch}>Search Now</button>
          <button className="create-btn" onClick={handleCreatePortfolio}>
            {hasPortfolio ? "Edit Portfolio" : "Create Portfolio"}
          </button>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="featured-title">Featured Portfolios</h2>
        <div className="portfolio-grid">
          {portfolios.map((p, i) => (
            <div className="portfolio-card" key={i}>
              <div className="card-avatar">{p.initials}</div>
              <h3 className="card-name">{p.name}</h3>
              <p className="card-role">{p.role}</p>
              <div className="card-skills">
                {p.skills.map((s, j) => (
                  <span key={j} className="skill-tag" style={{ background: p.skillColors[j] }}>{s}</span>
                ))}
              </div>
              <div className="stars">
                {[1,2,3,4,5].map(s => (
                  <span key={s} style={{ color: s <= p.rating ? "#f5c518" : "#ddd", fontSize: "18px" }}>★</span>
                ))}
              </div>
              <button className="view-btn" onClick={() => setSelectedProfile(p)}>View Portfolio</button>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Popup Modal */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div style={{ background: "#f0f4f8", borderRadius: "16px", width: "90%", maxWidth: "800px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 20px 0" }}>
              <button onClick={() => setSelectedProfile(null)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <div style={{ padding: "0 24px 32px" }}>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(74,111,165,0.1)", flexWrap: "wrap" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#4a6fa5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>{selectedProfile.initials}</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#1a2540", margin: "0 0 4px" }}>{selectedProfile.name}</h2>
                  <p style={{ color: "#4a6fa5", fontWeight: "600", margin: "0 0 6px" }}>{selectedProfile.role}</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 4px" }}>📍 {selectedProfile.fullProfile.location} | 💼 {selectedProfile.fullProfile.yearsExp} years experience</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>✉️ {selectedProfile.fullProfile.contactEmail}</p>
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>👤 About Me</h3>
                <p style={{ color: "#374151", lineHeight: "1.7", fontSize: "15px" }}>{selectedProfile.fullProfile.aboutMe}</p>
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>💡 Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedProfile.skills.map((s, i) => (
                    <span key={i} style={{ background: "#e8edf5", color: "#4a6fa5", padding: "7px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>{s}</span>
                  ))}
                </div>
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>🚀 Projects</h3>
                {selectedProfile.fullProfile.projectList.map((p, i) => (
                  <div key={i} style={{ border: "1px solid #e8edf5", borderRadius: "10px", padding: "16px", marginBottom: "10px" }}>
                    <h4 style={{ color: "#1a2540", margin: "0 0 6px" }}>{p.name}</h4>
                    <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 8px" }}>{p.description}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tech.split(",").map((t, j) => (
                        <span key={j} style={{ background: "#f0f4f8", color: "#4a6fa5", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>{t.trim()}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>🎓 Education</h3>
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px" }}>
                  <h4 style={{ color: "#1a2540", margin: "0 0 4px" }}>{selectedProfile.fullProfile.degree}</h4>
                  <p style={{ color: "#4a6fa5", fontWeight: "600", fontSize: "14px", margin: "0 0 4px" }}>{selectedProfile.fullProfile.institution}</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>{selectedProfile.fullProfile.startYear} – {selectedProfile.fullProfile.endYear} | CGPA: {selectedProfile.fullProfile.cgpa}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;