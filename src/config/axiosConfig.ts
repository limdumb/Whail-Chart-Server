import axios from "axios";
const BASE_URL = "https://chartin.me";
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJjaGFydGluLm1lIiwiaWF0IjoxNjk0MDcwMzA2LCJleHAiOjE2OTQwODQ3MDZ9.lA0NB_LZ3J5FuXB1f68UeMx_8Ryi6-JyGAXc5luG2jo";
export const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: accessToken },
  timeout: 1000,
});
