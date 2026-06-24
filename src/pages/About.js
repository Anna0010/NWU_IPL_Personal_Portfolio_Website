import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="home-page">
      <Navbar />
      <div style={{ maxWidth: "860px", margin: "60px auto", padding: "0 20px" }}>

        {/* Hero */}
        <div style={{ background: "#4a6fa5", borderRadius: "16px", padding: "48px 40px", color: "#fff", marginBottom: "28px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "36px", fontWeight: "700", marginBottom: "16px" }}>
            About PortfolioHub
          </h1>
          <p style={{ fontSize: "16px", opacity: "0.9", lineHeight: "1.7", maxWidth: "600px", margin: "0 auto" }}>
            PortfolioHub is a platform where developers and designers can create, showcase, and discover professional portfolios. We connect talented professionals with top companies around the world.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "28px" }}>
          {[
            { num: "500+", label: "Portfolios" },
            { num: "200+", label: "Companies" },
            { num: "50+", label: "Countries" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "14px", padding: "28px", textAlign: "center", boxShadow: "0 4px 20px rgba(74,111,165,0.08)" }}>
              <div style={{ fontSize: "32px", fontWeight: "700", color: "#4a6fa5", fontFamily: "Playfair Display, serif" }}>{s.num}</div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginTop: "6px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "36px 40px", boxShadow: "0 4px 20px rgba(74,111,165,0.08)", marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#1a2540", marginBottom: "16px" }}>Our Mission</h2>
          <p style={{ color: "#6b7280", lineHeight: "1.8", fontSize: "15px" }}>
            Our mission is to empower developers and designers by giving them a professional space to showcase their work. We believe that talent should be easily discoverable, and we bridge the gap between skilled professionals and the companies that need them.
          </p>
        </div>

        {/* Features */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "36px 40px", boxShadow: "0 4px 20px rgba(74,111,165,0.08)" }}>
          <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "24px", color: "#1a2540", marginBottom: "20px" }}>What We Offer</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: "🎨", title: "Portfolio Builder", desc: "Create a professional portfolio in minutes with our easy-to-use builder." },
              { icon: "🔍", title: "Smart Search", desc: "Find developers by skills, experience level, and project type." },
              { icon: "🌐", title: "Global Reach", desc: "Connect with companies and professionals from around the world." },
              { icon: "🔒", title: "Secure Platform", desc: "Your data is safe with Firebase Authentication and Firestore." },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", padding: "16px", background: "#f8fafc", borderRadius: "10px" }}>
                <span style={{ fontSize: "24px" }}>{f.icon}</span>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1a2540", marginBottom: "4px" }}>{f.title}</h3>
                  <p style={{ fontSize: "14px", color: "#6b7280", margin: "0" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;