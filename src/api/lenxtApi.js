import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const lenxtApi = axios.create({
  baseURL: API_URL,
});
