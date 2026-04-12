import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import API from "../../api";
import "./Register.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="900165407333-kh7bdmhtuatabqjnnvf39f6amnlnv9bp.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    occupation: "",
    mobile: "",
  });

  // 🔄 Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 📝 Register with FastAPI
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await API.post("/register", {
      fullName: formData.fullName,   // ✅ fixed field name
      email: formData.email,
      password: formData.password,
      age: Number(formData.age),
      occupation: formData.occupation,
      mobile: formData.mobile,
    });

    alert("Registration successful!");
    console.log(response.data);

  } catch (error) {
    console.log(error.response?.data);
    alert(JSON.stringify(error.response?.data));
  }
};

  // 🟢 Google Register (optional — only frontend currently)
const handleGoogleRegister = async (credentialResponse) => {
  try {
    const response = await API.post("/google-login", {
      token: credentialResponse.credential,
    });

    localStorage.setItem("token", response.data.token);

    alert("Google Login Successful!");
  } catch (error) {
    console.log(error.response?.data);
    alert("Google login failed");
  }
};

  return (
    <section className="register">
      <div className="register-container">
        <h1>Create Your Account</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
          />

          <select name="occupation" onChange={handleChange} required>
            <option value="">Select Occupation</option>
            <option value="student">Student</option>
            <option value="trader">Trader</option>
            <option value="analyst">Analyst</option>
          </select>

          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            required
          />

          <button type="submit" className="register-btn">
            Register Now
          </button>
        </form>

        <p>or</p>

        <GoogleLogin
          onSuccess={handleGoogleRegister}
          onError={() => alert("Google signup failed")}
        />
      </div>
    </section>
  );
}

export default Register;