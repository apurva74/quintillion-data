const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// TEMP OTP STORE (for learning)
let otpStore = {};

// 📲 SEND OTP
app.post("/api/auth/send-otp", (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ message: "Mobile number required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[mobile] = otp;

  console.log(`OTP for ${mobile}: ${otp}`);

  res.json({ success: true, message: "OTP sent successfully" });
});

// ✅ VERIFY OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (otpStore[mobile] == otp) {
    delete otpStore[mobile];
    return res.json({ success: true, message: "OTP verified" });
  }

  res.status(400).json({ success: false, message: "Invalid OTP" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
