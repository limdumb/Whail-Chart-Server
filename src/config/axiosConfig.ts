import axios from "axios";
const BASE_URL = "https://chartin.me";
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJjaGFydGluLm1lIiwiaWF0IjoxNjkzNzk5Mzk3LCJleHAiOjE2OTM4MTM3OTd9.gUqMb2aVcCn9piAB3iPePPE2VeedxKBwi5moDB_6sf0";
export const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: accessToken },
});
