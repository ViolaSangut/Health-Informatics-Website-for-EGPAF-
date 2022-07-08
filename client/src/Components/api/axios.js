import axios from "axios";

const URL = "http://localhost:4000";

export const privateAxios = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
