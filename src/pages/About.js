import React from "react";
import Navbar from "../components/Navbar";

function About() {
  return (
    <div className="home-page">
      <Navbar />
      <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 20px rgba(74,111,165,0.1)" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "32px", color: "#1a2540", marginBottom: "16px" }}>
            About PortfolioHub
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: "1.8", marginBottom: "20px" }}>
            PortfolioHub is a platform where developers and designers can create, showcase, and discover professional portfolios.
          </p>
          <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: "1.8", marginBottom: "20px" }}>
            Our mission is to connect talented professionals with top companies around the world.
          </p>
          <div style={{ display: "flex", gap: "20px", marginTop: "30px", flexWrap: "wrap" }}>
            <div style={{ background: "#f0f4f8", borderRadius: "12px", padding: "20px 30px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#4a6fa5" }}>500+</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Portfolios</div>
            </div>
            <div style={{ background: "#f0f4f8", borderRadius: "12px", padding: "20px 30px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#4a6fa5" }}>200+</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Companies</div>
            </div>
            <div style={{ background: "#f0f4f8", borderRadius: "12px", padding: "20px 30px", textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#4a6fa5" }}>50+</div>
              <div style={{ fontSize: "14px", color: "#6b7280" }}>Countries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;