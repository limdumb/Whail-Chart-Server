import axios from "axios";
const BASE_URL = "https://chartin.me";
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJjaGFydGluLm1lIiwiaWF0IjoxNjkyOTM2NjUxLCJleHAiOjE2OTI5NTEwNTF9.YJ9H6w3KFA5mvx0_Q9jRM1AZ_T8MWT58bi1psWi0o8k";
export const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: accessToken },
});
