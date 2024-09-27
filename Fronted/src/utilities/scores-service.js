import * as scoresAPi from "./scores-api";

export async function getTopScores() {
  return await scoresAPi.getTopScores();
}
export async function getTopTimes() {
  return await scoresAPi.getTopTimes();
}
