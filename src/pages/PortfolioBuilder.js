import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const SECTIONS = ["Basic Info", "Skills", "Projects", "Education", "Experience", "Contact"];

function PortfolioBuilder() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const photoInputRef = useRef(null);

  const isEditMode = location.state?.edit === true;
  const saved = isEditMode ? JSON.parse(localStorage.getItem("portfolioData") || "{}") : JSON.parse(localStorage.getItem("draftData") || "{}");

  const [activeSection, setActiveSection] = useState("Basic Info");
  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState(saved.photo || null);

  const [fullName, setFullName] = useState(saved.fullName || "");
  const [profTitle, setProfTitle] = useState(saved.profTitle || "");
  const [aboutMe, setAboutMe] = useState(saved.aboutMe || "");
  const [yearsExp, setYearsExp] = useState(saved.yearsExp || "");
  const [location2, setLocation2] = useState(saved.location || "");
  const [skills, setSkills] = useState(saved.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [projects, setProjects] = useState(saved.projects || [
    { name: "", url: "", description: "", tech: "", github: "" }
  ]);
  const [degree, setDegree] = useState(saved.degree || "");
  const [institution, setInstitution] = useState(saved.institution || "");
  const [startYear, setStartYear] = useState(saved.startYear || "");
  const [endYear, setEndYear] = useState(saved.endYear || "");
  const [cgpa, setCgpa] = useState(saved.cgpa || "");
  const [contactEmail, setContactEmail] = useState(saved.contactEmail || currentUser?.email || "");
  const [phone, setPhone] = useState(saved.phone || "");
  const [linkedin, setLinkedin] = useState(saved.linkedin || "");
  const [github, setGithub] = useState(saved.github || "");
  const [website, setWebsite] = useState(saved.website || "");

  const userInitials = currentUser?.email?.slice(0, 2).toUpperCase() || "AS";

  // Photo upload
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleRemovePhoto() {
    setPhoto(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  }

  // Dynamic progress bar
  const progress = (() => {
    let score = 0;
    if (fullName) score += 15;
    if (profTitle) score += 10;
    if (aboutMe) score += 10;
    if (yearsExp && location2) score += 10;
    if (skills.length > 0) score += 15;
    if (projects[0]?.name) score += 15;
    if (degree && institution) score += 15;
    if (contactEmail) score += 5;
    if (phone) score += 3;
    if (linkedin || github) score += 2;
    return Math.min(score, 100);
  })();

  const currentData = {
    fullName, profTitle, aboutMe, yearsExp, location: location2,
    skills, projects, degree, institution, startYear,
    endYear, cgpa, contactEmail, phone, linkedin, github, website,
    photo: photo || null,
    email: currentUser?.email || "",
    userId: currentUser?.uid || "",
    createdAt: new Date().toISOString()
  };

  function addSkill() {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  }
  function removeSkill(s) { setSkills(skills.filter(sk => sk !== s)); }
  function addProject() {
    setProjects([...projects, { name: "", url: "", description: "", tech: "", github: "" }]);
  }
  function updateProject(i, field, val) {
    const updated = [...projects];
    updated[i][field] = val;
    setProjects(updated);
  }

  function handleSaveDraft() {
    localStorage.setItem("draftData", JSON.stringify(currentData));
    alert("✅ Draft saved! You can continue editing later.");
  }

  async function handlePublish() {
    try {
      const dataToSave = { ...currentData };
      // photo বাদ দিয়ে Firestore এ save করো (base64 too large)
      delete dataToSave.photo;
      await setDoc(doc(db, "portfolios", currentUser.uid), dataToSave);
      localStorage.setItem("portfolioData", JSON.stringify(currentData));
      localStorage.removeItem("draftData");
      alert("🎉 Portfolio Published!");
      navigate("/profile");
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Error saving portfolio. Please try again.");
    }
  }

  return (
    <div className="builder-page">
      <nav className="builder-navbar">
        <div className="nav-logo">PortfolioHub</div>
        <div className="builder-nav-actions">
          <button className="btn-preview" onClick={() => setShowPreview(true)}>Preview</button>
          <button className="btn-save-draft" onClick={handleSaveDraft}>Save Draft</button>
          <div className="nav-user" onClick={() => navigate("/profile")} title="View my profile" style={{ cursor: "pointer" }}>
            <div className="user-avatar">{userInitials}</div>
            <span className="user-name">AnnaSweety</span>
          </div>
        </div>
      </nav>
      <div className="builder-layout">
        <aside className="builder-sidebar">
          <p className="section-label">SECTION</p>
          {SECTIONS.map((sec) => (
            <button key={sec}
              className={`section-nav-btn ${activeSection === sec ? "active" : ""}`}
              onClick={() => setActiveSection(sec)}>{sec}</button>
          ))}
        </aside>
        <main className="builder-main">
          <p className="builder-hint">Fill in your information to create a professional portfolio</p>
          <div className="progress-bar-wrapper">
            <div className="progress-bar" style={{ width: `${progress}%`, transition: "width 0.4s ease" }}></div>
            <span className="progress-label">{progress}%</span>
          </div>

          <div className="form-section">
            <h2 className="section-title">🪪 Basic Information</h2>
            <p className="section-sub">Tell us about yourself</p>
            <div className="photo-row">
              {/* Photo preview */}
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div className="photo-avatar">{userInitials}</div>
              )}
              <div className="photo-actions">
                <div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    accept="image/*"
                    ref={photoInputRef}
                    onChange={handlePhotoUpload}
                    style={{ display: "none" }}
                  />
                  <button className="btn-upload" onClick={() => photoInputRef.current.click()}>
                    Upload Photo
                  </button>
                  <button className="btn-remove" onClick={handleRemovePhoto}>Remove</button>
                </div>
                <p className="photo-hint">Recommended: Square image, at least 400x400px</p>
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Full Name *</label>
                <input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your full name" />
              </div>
              <div className="field-group">
                <label>Professional Title *</label>
                <input value={profTitle} onChange={e => setProfTitle(e.target.value)} placeholder="e.g. Full Stack Developer" />
              </div>
            </div>
            <div className="field-group">
              <label>About Me *</label>
              <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)} rows={4} maxLength={500} placeholder="Write something about yourself..." />
              <small>Aim for 150-200 words</small>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Years of Experience</label>
                <input value={yearsExp} onChange={e => setYearsExp(e.target.value)} placeholder="e.g. 3" />
              </div>
              <div className="field-group">
                <label>Location</label>
                <input value={location2} onChange={e => setLocation2(e.target.value)} placeholder="e.g. Khulna, Bangladesh" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">💼 Skills</h2>
            <p className="section-sub">Add your technical and professional skills</p>
            <label>Your Skills</label>
            <div className="skills-box">
              {skills.map((s) => (
                <span key={s} className="skill-chip">
                  {s} <button onClick={() => removeSkill(s)}>×</button>
                </span>
              ))}
            </div>
            <div className="skill-add-row">
              <input value={newSkill} onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => e.key === "Enter" && addSkill()}
                placeholder="Type a skill and click Add" />
              <button className="btn-add-skill" onClick={addSkill}>+ Add Skill</button>
            </div>
            <small>Press Enter or click Add to add skills</small>
          </div>

          <div className="form-section">
            <h2 className="section-title">🚀 Projects</h2>
            <p className="section-sub">Showcase your best work</p>
            {projects.map((proj, i) => (
              <div className="project-card-form" key={i}>
                <h4 className="project-num">Project #{i + 1}</h4>
                <div className="field-row">
                  <div className="field-group">
                    <label>Project Name *</label>
                    <input value={proj.name} onChange={e => updateProject(i, "name", e.target.value)} placeholder="e.g. E-Commerce Platform" />
                  </div>
                  <div className="field-group">
                    <label>Project URL</label>
                    <input value={proj.url} onChange={e => updateProject(i, "url", e.target.value)} placeholder="https://example.com" />
                  </div>
                </div>
                <div className="field-group">
                  <label>Description</label>
                  <textarea value={proj.description} onChange={e => updateProject(i, "description", e.target.value)} rows={4} placeholder="Describe your project..." />
                </div>
                <div className="field-row">
                  <div className="field-group">
                    <label>Technologies Used</label>
                    <input value={proj.tech} onChange={e => updateProject(i, "tech", e.target.value)} placeholder="React, Node.js, MongoDB" />
                  </div>
                  <div className="field-group">
                    <label>GitHub Repository</label>
                    <input value={proj.github} onChange={e => updateProject(i, "github", e.target.value)} placeholder="http://github.com" />
                  </div>
                </div>
              </div>
            ))}
            <button className="btn-add-project" onClick={addProject}>+ Add Another Project</button>
          </div>

          <div className="form-section">
            <h2 className="section-title">🎓 Education</h2>
            <p className="section-sub">Add your educational background</p>
            <div className="field-row">
              <div className="field-group">
                <label>Degree *</label>
                <input value={degree} onChange={e => setDegree(e.target.value)} placeholder="e.g. BSc in Computer Science" />
              </div>
              <div className="field-group">
                <label>Institution *</label>
                <input value={institution} onChange={e => setInstitution(e.target.value)} placeholder="e.g. North Western University, Khulna" />
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>Start Year</label>
                <input value={startYear} onChange={e => setStartYear(e.target.value)} placeholder="2020" />
              </div>
              <div className="field-group">
                <label>End Year</label>
                <input value={endYear} onChange={e => setEndYear(e.target.value)} placeholder="2024" />
              </div>
            </div>
            <div className="field-group">
              <label>CGPA / Grade</label>
              <input value={cgpa} onChange={e => setCgpa(e.target.value)} placeholder="3.75" style={{ maxWidth: "200px" }} />
            </div>
          </div>

          <div className="form-section">
            <h2 className="section-title">📋 Contact Information</h2>
            <p className="section-sub">How can people reach you?</p>
            <div className="field-row">
              <div className="field-group">
                <label>Email *</label>
                <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="your@email.com" />
              </div>
              <div className="field-group">
                <label>Phone Number</label>
                <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+880 1712-345678" />
              </div>
            </div>
            <div className="field-row">
              <div className="field-group">
                <label>LinkedIn Profile</label>
                <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="http://linkedin.com/in/your-profile" />
              </div>
              <div className="field-group">
                <label>GitHub Profile</label>
                <input value={github} onChange={e => setGithub(e.target.value)} placeholder="http://github.com/your-username" />
              </div>
            </div>
            <div className="field-group">
              <label>Portfolio Website</label>
              <input value={website} onChange={e => setWebsite(e.target.value)} placeholder="http://yourwebsite.com" style={{ maxWidth: "360px" }} />
            </div>
          </div>

          <div className="builder-actions">
            <button className="btn-cancel" onClick={() => navigate("/home")}>Cancel</button>
            <button className="btn-save-draft-bottom" onClick={handleSaveDraft}>Save as Draft</button>
            <button className="btn-publish" onClick={handlePublish}>Publish Portfolio</button>
          </div>
        </main>
      </div>

      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div style={{ background: "#fff", borderRadius: "16px", padding: "32px", width: "90%", maxWidth: "700px", maxHeight: "85vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", color: "#1a2540" }}>👁️ Preview</h2>
              <button onClick={() => setShowPreview(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "20px", padding: "20px", background: "#f0f4f8", borderRadius: "12px" }}>
              {photo ? (
                <img src={photo} alt="Profile" style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: "#4a6fa5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", fontWeight: "700" }}>{userInitials}</div>
              )}
              <div>
                <h3 style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", color: "#1a2540", margin: "0 0 4px" }}>{fullName || "Your Name"}</h3>
                <p style={{ color: "#4a6fa5", fontWeight: "600", margin: "0 0 4px" }}>{profTitle || "Your Title"}</p>
                <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>📍 {location2 || "Location"} | 💼 {yearsExp || "0"} years</p>
              </div>
            </div>
            {aboutMe && (
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ color: "#1a2540", marginBottom: "8px" }}>👤 About Me</h4>
                <p style={{ color: "#6b7280", lineHeight: "1.6", fontSize: "14px" }}>{aboutMe}</p>
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ color: "#1a2540", marginBottom: "8px" }}>💡 Skills</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {skills.map((s, i) => (
                    <span key={i} style={{ background: "#e8edf5", color: "#4a6fa5", padding: "5px 14px", borderRadius: "20px", fontSize: "13px", fontWeight: "600" }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
            {projects[0]?.name && (
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ color: "#1a2540", marginBottom: "8px" }}>🚀 Projects</h4>
                {projects.map((p, i) => p.name && (
                  <div key={i} style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px 16px", marginBottom: "8px" }}>
                    <strong style={{ color: "#1a2540" }}>{p.name}</strong>
                    {p.description && <p style={{ color: "#6b7280", fontSize: "13px", margin: "4px 0" }}>{p.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {degree && (
              <div>
                <h4 style={{ color: "#1a2540", marginBottom: "8px" }}>🎓 Education</h4>
                <div style={{ background: "#f8fafc", borderRadius: "10px", padding: "12px 16px" }}>
                  <strong style={{ color: "#1a2540" }}>{degree}</strong>
                  <p style={{ color: "#4a6fa5", fontSize: "13px", margin: "4px 0" }}>{institution}</p>
                  <p style={{ color: "#6b7280", fontSize: "13px", margin: "0" }}>{startYear} – {endYear} | CGPA: {cgpa}</p>
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", marginTop: "24px", justifyContent: "flex-end" }}>
              <button onClick={() => setShowPreview(false)} style={{ padding: "10px 24px", background: "#f0f4f8", color: "#374151", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Close</button>
              <button onClick={() => { setShowPreview(false); handlePublish(); }} style={{ padding: "10px 24px", background: "#4a6fa5", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Publish Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioBuilder;