import axios from "axios";

const BASE_URL = "https://localhost:5000/api/";
const token = localStorage.getItem("accessTokenAdmin") || "{}";
const TOKEN = token

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });
  

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});


export {};
