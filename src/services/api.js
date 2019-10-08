import axios from "axios";

const api = axios.create({
  baseURL: "https://apiserver-labtec.herokuapp.com"
});

export default api;
