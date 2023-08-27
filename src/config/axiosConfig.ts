import axios from "axios";
const BASE_URL = "https://chartin.me";
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJjaGFydGluLm1lIiwiaWF0IjoxNjkzMDMzMjk0LCJleHAiOjE2OTMwNDc2OTR9.VUU8I0synNMWyuH-odAuRxHvlC0ZrEQJq-oxd_nIHXs";
export const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: accessToken },
});
