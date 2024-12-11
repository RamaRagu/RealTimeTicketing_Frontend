import axios from "axios";

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: "http://localhost:8080/api/tickets",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
