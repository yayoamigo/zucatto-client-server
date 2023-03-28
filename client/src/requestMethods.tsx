import axios from 'axios';

const BASE_URL = 'https://localhost:5000/api/';
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjM1ODM4ZTcyY2RjMzk4YmExMWYzOSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2ODAwMzc5NzIsImV4cCI6MTY4MDI5NzE3Mn0.KOszJMmyDHct9z0L_jhR-T1CczlCkfH0l1xe8-vA2Bc";

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token:`Bearer ${TOKEN}`}
});

export {};