import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LeftPanel from "../components/LeftPanel";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (!agree) {
      return setError("Please agree to Terms & Conditions.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    setLoading(true);
    try {
      await signup(email, password);
      navigate("/home");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError("Could not create account. Please try again.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="auth-layout">
      <LeftPanel />
      <div className="auth-right">
        <div className="auth-header">
          <h2>Get Started</h2>
          <p>Join thousands of professionals</p>
        </div>
        <div className="tab-switcher">
          <Link to="/login" className="tab-btn">Login</Link>
          <span className="tab-btn active">Sign Up</span>
        </div>
        {error && <div className="error-box">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <input type="text" placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <input type="email" placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <input type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <div className="input-wrapper">
              <input type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required />
              <button type="button" className="eye-icon"
                onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className="checkbox-row">
            <input type="checkbox" id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)} />
            <label htmlFor="agree">
              I agree to <a href="#terms">Terms & Conditions</a>
            </label>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;