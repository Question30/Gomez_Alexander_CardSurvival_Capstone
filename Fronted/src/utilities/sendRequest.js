import { getToken } from "./users-service";

export default async function sendRequest(url, method = "GET", payload = null) {
  //Fetch accpets an options object as teh 2nd param
  //Used to include a data payload, set headers, etc.
  const options = { method };
  if (payload) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if (token) {
    //Ensure the headers object exists
    options.headers = options.headers || {};
    //Add token to an Authorization header
    //Prefacting with Bearer is recommended in the HTTP specifiaction
    options.headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, options);

  if (res.ok) return res.json();
  throw new Error("Bad Request");
}
