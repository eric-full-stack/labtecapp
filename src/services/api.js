import axios from "axios";

const api = axios.create({
  baseURL: "http://150.162.6.15/"
});

export default api;
