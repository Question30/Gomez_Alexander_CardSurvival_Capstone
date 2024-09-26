import * as usersApi from "./users-api";

export async function signUp(userData) {
  const token = await usersApi.signUp(userData);

  localStorage.setItem("CSGToken", token.token);
}

export async function login(credentials) {
  const token = await usersApi.login(credentials);

  localStorage.setItem("CSGToken", token.token);

  return getUser();
}

export async function addScore(score) {
  const token = getToken();
  if (token) {
    const userName = getUser();
    await usersApi.addScore(score, userName);
    return "Score Added";
  }

  return "Score not Added";
}

export function getUser() {
  const token = getToken();

  return token ? JSON.parse(atob(token.split(".")[1])).sub : null;
}

export function getToken() {
  const token = localStorage.getItem("CSGToken");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("CSGToken");
    return null;
  }

  return token;
}

export function logout() {
  localStorage.removeItem("CSGToken");
}
