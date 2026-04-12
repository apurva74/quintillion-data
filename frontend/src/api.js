import axios from "axios";

const API = axios.create({
  baseURL: "https://quintillion-data.onrender.com",   // FastAPI URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;