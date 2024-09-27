import sendRequest from "./sendRequest";

const BASE_URL = "http://localhost:8080/api";

export function getTopScores() {
  return sendRequest(`${BASE_URL}/scores/topScores`);
}

export function getTopTimes() {
  return sendRequest(`${BASE_URL}/scores/topTimes`);
}
