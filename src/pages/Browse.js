import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const defaultDevelopers = [
  {
    id: "default1", initials: "KP", name: "Keya Parvin", role: "Full Stack React Developer",
    bio: "Passionate developer specializing in React and modern web technologies. Built multiple e-commerce platforms and SaaS applications.",
    skills: ["React", "JavaScript", "Node.js", "MongoDB"],
    skillColors: ["#d4edda", "#d1ecf1", "#fff3cd", "#fce4ec"],
    projects: 12, years: 3, badge: "⭐ 3 Years Experience",
    level: "Senior", type: "Web",
    fullProfile: {
      aboutMe: "Hi! I'm Keya Parvin, a passionate Full Stack React Developer with 3 years of experience. I specialize in building scalable web applications and e-commerce platforms.",
      degree: "BSc in Computer Science", institution: "University of Dhaka",
      startYear: "2018", endYear: "2022", cgpa: "3.80",
      contactEmail: "keya.parvin@gmail.com", phone: "+880 1712-111111",
      location: "Dhaka, Bangladesh", yearsExp: "3",
      projectList: [{ name: "E-Commerce Platform", description: "A full-featured e-commerce platform.", tech: "React, Node.js, MongoDB" }]
    }
  },
  {
    id: "default2", initials: "SP", name: "Shaima Parvin", role: "UI/UX Designer",
    bio: "Creative frontend developer with strong design sense. Expert in building responsive and accessible web applications.",
    skills: ["Figma", "Adobe XD", "CSS", "JavaScript"],
    skillColors: ["#fce4ec", "#e8eaf6", "#e0f7fa", "#fff3cd"],
    projects: 8, years: 2, badge: "⭐ 2 Years Experience",
    level: "Mid", type: "UI/UX",
    fullProfile: {
      aboutMe: "Hi! I'm Shaima Parvin, a UI/UX Designer with 2 years of experience. I love creating beautiful and user-friendly interfaces.",
      degree: "BSc in Computer Science", institution: "BUET",
      startYear: "2019", endYear: "2023", cgpa: "3.75",
      contactEmail: "shaima.parvin@gmail.com", phone: "+880 1712-222222",
      location: "Dhaka, Bangladesh", yearsExp: "2",
      projectList: [{ name: "Portfolio Design System", description: "A complete design system for portfolio websites.", tech: "Figma, Adobe XD" }]
    }
  },
  {
    id: "default3", initials: "JP", name: "Jara Parvin", role: "Frontend Developer",
    bio: "Senior developer experienced in building scalable web applications. Specialized in React ecosystem and performance optimization.",
    skills: ["JavaScript", "React", "Next.js", "TypeScript"],
    skillColors: ["#fff9c4", "#d4edda", "#d1ecf1", "#e8eaf6"],
    projects: 15, years: 4, badge: "⭐ 4 Years Experience",
    level: "Senior", type: "Web",
    fullProfile: {
      aboutMe: "Hi! I'm Jara Parvin, a Senior Frontend Developer with 4 years of experience. I specialize in React and Next.js applications.",
      degree: "BSc in Software Engineering", institution: "BRAC University",
      startYear: "2017", endYear: "2021", cgpa: "3.90",
      contactEmail: "jara.parvin@gmail.com", phone: "+880 1712-333333",
      location: "Dhaka, Bangladesh", yearsExp: "4",
      projectList: [{ name: "Next.js Dashboard", description: "A high-performance analytics dashboard built with Next.js.", tech: "Next.js, TypeScript, Tailwind" }]
    }
  },
];

function Browse() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const [searchTerm, setSearchTerm] = useState(state.searchTerm || "");
  const [selectedSkills, setSelectedSkills] = useState(state.selectedSkill ? [state.selectedSkill] : []);
  const [selectedLevel, setSelectedLevel] = useState(state.selectedLevel || "");
  const [selectedType, setSelectedType] = useState(state.selectedType || "");
  const [allDevelopers, setAllDevelopers] = useState(defaultDevelopers);
  const [filtered, setFiltered] = useState(defaultDevelopers);
  const [loading, setLoading] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    async function loadPortfolios() {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolios"));
        const firestoreDevs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.fullName) {
            firestoreDevs.push({
              id: doc.id,
              initials: data.fullName?.slice(0, 2).toUpperCase() || "??",
              name: data.fullName || "",
              role: data.profTitle || "",
              bio: data.aboutMe || "",
              skills: data.skills || [],
              skillColors: ["#d4edda", "#d1ecf1", "#fff3cd", "#fce4ec"],
              projects: data.projects?.length || 0,
              years: data.yearsExp || "0",
              badge: `⭐ ${data.yearsExp || "0"} Years Experience`,
              level: parseInt(data.yearsExp) >= 5 ? "Senior" : parseInt(data.yearsExp) >= 2 ? "Mid" : "Junior",
              type: "Web",
              fullProfile: {
                aboutMe: data.aboutMe || "",
                degree: data.degree || "",
                institution: data.institution || "",
                startYear: data.startYear || "",
                endYear: data.endYear || "",
                cgpa: data.cgpa || "",
                contactEmail: data.contactEmail || "",
                phone: data.phone || "",
                location: data.location || "",
                yearsExp: data.yearsExp || "",
                projectList: data.projects || []
              }
            });
          }
        });
        const combined = [...defaultDevelopers, ...firestoreDevs];
        setAllDevelopers(combined);
        setFiltered(combined);
      } catch (error) {
        console.error("Error loading portfolios:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPortfolios();
  }, []);

  useEffect(() => {
    let results = allDevelopers;
    if (searchTerm.trim()) {
      results = results.filter(dev =>
        dev.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        dev.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dev.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedSkills.length > 0) {
      results = results.filter(dev =>
        selectedSkills.every(skill =>
          dev.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }
    if (selectedLevel) results = results.filter(dev => dev.level === selectedLevel);
    if (selectedType) results = results.filter(dev => dev.type === selectedType);
    // Sort logic
    if (sortBy === "years") {
      results = [...results].sort((a, b) => parseInt(b.years) - parseInt(a.years));
    } else if (sortBy === "projects") {
      results = [...results].sort((a, b) => parseInt(b.projects) - parseInt(a.projects));
    }

    setFiltered(results);
  }, [searchTerm, selectedSkills, selectedLevel, selectedType, allDevelopers, sortBy]);

  function toggleSkill(skill) {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  }

  function clearAll() {
    setSearchTerm("");
    setSelectedSkills([]);
    setSelectedLevel("");
    setSelectedType("");
  }

  return (
    <div className="home-page">
      <Navbar />
      <div className="browse-top-bar">
        <div className="browse-search-wrapper">
          <input type="text" className="browse-top-search" placeholder="Search by skill or name..."
            value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="browse-layout">
        <aside className="browse-sidebar">
          <div className="filter-card">
            <p className="filter-heading">Skills</p>
            {["React", "JavaScript", "Node.js", "CSS", "Figma"].map(skill => (
              <label key={skill} className="filter-item">
                <input type="checkbox" checked={selectedSkills.includes(skill)} onChange={() => toggleSkill(skill)} />
                <span className="filter-label">{skill}</span>
              </label>
            ))}
          </div>
          <div className="filter-card">
            <p className="filter-heading">Experience Level</p>
            {["Junior", "Mid", "Senior"].map(level => (
              <label key={level} className="filter-item">
                <input type="radio" name="level" checked={selectedLevel === level} onChange={() => setSelectedLevel(selectedLevel === level ? "" : level)} />
                <span className="filter-label">{level}</span>
              </label>
            ))}
          </div>
          <div className="filter-card">
            <p className="filter-heading">Project Type</p>
            {["Web", "Mobile", "UI/UX"].map(type => (
              <label key={type} className="filter-item">
                <input type="radio" name="type" checked={selectedType === type} onChange={() => setSelectedType(selectedType === type ? "" : type)} />
                <span className="filter-label">{type}</span>
              </label>
            ))}
          </div>
          <button onClick={clearAll} style={{ width: "100%", padding: "10px", background: "#fff", border: "1.5px solid #4a6fa5", borderRadius: "10px", color: "#4a6fa5", fontWeight: "600", cursor: "pointer", fontSize: "14px" }}>
            Clear All Filters
          </button>
        </aside>

        <div className="browse-results">
          <div className="results-header">
            <p className="results-count">
              {loading ? "Loading..." : `Showing ${filtered.length} developer${filtered.length !== 1 ? "s" : ""}`}
            </p>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-btn"
              style={{ cursor: "pointer" }}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="years">Sort by: Experience</option>
              <option value="projects">Sort by: Projects</option>
            </select>
          </div>
          <div className="developer-list">
            {loading ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading portfolios...</div>
            ) : filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "#888" }}>
                <p style={{ fontSize: "18px", marginBottom: "8px" }}>No results found</p>
                <button onClick={clearAll} style={{ padding: "10px 24px", background: "#4a6fa5", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Clear Filters</button>
              </div>
            ) : (
              filtered.map((dev, i) => (
                <div className="developer-card" key={i}>
                  <div className="dev-left">
                    <div className="dev-avatar">{dev.initials}</div>
                  </div>
                  <div className="dev-info">
                    <div className="dev-top-row">
                      <div>
                        <p className="dev-name">{dev.name}</p>
                        <p className="dev-role">{dev.role}</p>
                      </div>
                      <div className="dev-stats">
                        <div className="stat-item">
                          <span className="stat-num blue">{dev.projects}</span>
                          <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-item">
                          <span className="stat-num blue">{dev.years}</span>
                          <span className="stat-label">Years</span>
                        </div>
                      </div>
                    </div>
                    <p className="dev-bio">{dev.bio}</p>
                    <div className="dev-skills">
                      {dev.skills.map((s, j) => (
                        <span key={j} className="dev-skill-tag" style={{ background: dev.skillColors[j] || "#e8edf5" }}>{s}</span>
                      ))}
                    </div>
                    <span className="dev-badge">{dev.badge}</span>
                    <button className="view-profile-btn" onClick={() => setSelectedProfile(dev)}>View Profile</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div style={{ background: "#f0f4f8", borderRadius: "16px", width: "90%", maxWidth: "800px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>

            {/* Close button */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 20px 0" }}>
              <button onClick={() => setSelectedProfile(null)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
            </div>

            <div style={{ padding: "0 24px 32px" }}>
              {/* Top card */}
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "center", gap: "24px", marginBottom: "20px", boxShadow: "0 4px 20px rgba(74,111,165,0.1)", flexWrap: "wrap" }}>
                <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#4a6fa5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "700", fontFamily: "Playfair Display, serif" }}>{selectedProfile.initials}</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#1a2540", margin: "0 0 4px" }}>{selectedProfile.name}</h2>
                  <p style={{ color: "#4a6fa5", fontWeight: "600", margin: "0 0 6px" }}>{selectedProfile.role}</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 4px" }}>📍 {selectedProfile.fullProfile?.location} | 💼 {selectedProfile.years} years experience</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>✉️ {selectedProfile.fullProfile?.contactEmail}</p>
                </div>
              </div>

              {/* About */}
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>👤 About Me</h3>
                <p style={{ color: "#374151", lineHeight: "1.7", fontSize: "15px" }}>{selectedProfile.fullProfile?.aboutMe}</p>
              </div>

              {/* Skills */}
              <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>💡 Skills</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {selectedProfile.skills.map((s, i) => (
                    <span key={i} style={{ background: "#e8edf5", color: "#4a6fa5", padding: "7px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>{s}</span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              {selectedProfile.fullProfile?.projectList?.length > 0 && (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", marginBottom: "16px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                  <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>🚀 Projects</h3>
                  {selectedProfile.fullProfile.projectList.map((p, i) => (
                    <div key={i} style={{ border: "1px solid #e8edf5", borderRadius: "10px", padding: "16px", marginBottom: "10px" }}>
                      <h4 style={{ color: "#1a2540", margin: "0 0 6px" }}>{p.name}</h4>
                      <p style={{ color: "#6b7280", fontSize: "14px", margin: "0 0 8px" }}>{p.description}</p>
                      {p.tech && (
                        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                          {p.tech.split(",").map((t, j) => (
                            <span key={j} style={{ background: "#f0f4f8", color: "#4a6fa5", padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {selectedProfile.fullProfile?.degree && (
                <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 2px 10px rgba(74,111,165,0.06)" }}>
                  <h3 style={{ fontFamily: "Playfair Display, serif", color: "#1a2540", marginBottom: "12px", paddingBottom: "10px", borderBottom: "2px solid #e8edf5" }}>🎓 Education</h3>
                  <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "16px" }}>
                    <h4 style={{ color: "#1a2540", margin: "0 0 4px" }}>{selectedProfile.fullProfile.degree}</h4>
                    <p style={{ color: "#4a6fa5", fontWeight: "600", fontSize: "14px", margin: "0 0 4px" }}>{selectedProfile.fullProfile.institution}</p>
                    <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>{selectedProfile.fullProfile.startYear} – {selectedProfile.fullProfile.endYear} | CGPA: {selectedProfile.fullProfile.cgpa}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Browse;