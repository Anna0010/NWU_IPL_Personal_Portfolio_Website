import React, { useState } from "react";
import Navbar from "../components/Navbar";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit() {
    if (name && email && message) {
      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSent(false), 3000);
    } else {
      alert("Please fill in all fields!");
    }
  }

  return (
    <div className="home-page">
      <Navbar />
      <div style={{ maxWidth: "600px", margin: "60px auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: "16px", padding: "40px", boxShadow: "0 4px 20px rgba(74,111,165,0.1)" }}>
          <h1 style={{ fontFamily: "Playfair Display, serif", fontSize: "32px", color: "#1a2540", marginBottom: "8px" }}>
            Contact Us
          </h1>
          <p style={{ fontSize: "15px", color: "#6b7280", marginBottom: "30px" }}>
            Have questions? We'd love to hear from you!
          </p>

          {sent && (
            <div style={{ background: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: "10px", marginBottom: "20px", fontWeight: "600" }}>
              ✅ Message sent successfully!
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Your Name *</label>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", fontFamily: "DM Sans, sans-serif", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Email Address *</label>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", fontFamily: "DM Sans, sans-serif", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "600", color: "#444", display: "block", marginBottom: "6px" }}>Message *</label>
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message here..." rows={5}
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #e0e0e0", borderRadius: "10px", fontSize: "14px", fontFamily: "DM Sans, sans-serif", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
            </div>
            <button onClick={handleSubmit}
              style={{ padding: "14px", background: "#4a6fa5", color: "#fff", border: "none", borderRadius: "10px", fontSize: "15px", fontWeight: "600", fontFamily: "DM Sans, sans-serif", cursor: "pointer" }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;