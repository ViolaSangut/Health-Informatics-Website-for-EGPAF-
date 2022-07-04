import axios from "axios";

const BASE_URL = "http://localhost:4000";

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
