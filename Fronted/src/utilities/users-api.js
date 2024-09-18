import sendRequest from "./sendRequest";
import { getToken } from "./users-service";

const BASE_URL = "http://localhost:8080/api";

export function signUp(userData) {
  return sendRequest(`${BASE_URL}/auth/signup`, "POST", userData);
}
