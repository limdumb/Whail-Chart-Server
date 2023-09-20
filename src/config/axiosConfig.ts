import axios from "axios";
const BASE_URL = "https://chartin.me";
const accessToken =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpc3MiOiJjaGFydGluLm1lIiwiaWF0IjoxNjk1MDkwNTQ3LCJleHAiOjE2OTUxMDQ5NDd9.G3q2ujIK6RDvcIBLLeN_iRSgbry4y77Vd2J4D1gvLo8";
export const baseInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: accessToken },
  timeout: 1000,
});
