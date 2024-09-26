import sendRequest from "./sendRequest";

const BASE_URL = "http://localhost:8080/api";

export function signUp(userData) {
  return sendRequest(`${BASE_URL}/auth/signup`, "POST", userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/auth/login`, "POST", credentials);
}

export function addScore(score, userName) {
  return sendRequest(`${BASE_URL}/users/score/${userName}`, "PUT", score);
}
