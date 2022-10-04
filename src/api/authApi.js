import { API_URL } from "../utils/Constants";
import { apiRequest } from "../utils/Helpers";

export function login({ email, password }) {
  const data = {
    email: email,
    password: password,
  };
  const url = `${API_URL}login`;
  return apiRequest(url, "POST", data).catch((error) => console.error(error));
}

export function logout() {
  const url = `${API_URL}logout`;
  return apiRequest(url, "GET", null).catch((error) => console.error(error));
}

export function signup({ email, password, nickname, firstName, lastName }) {
  const data = {
    email: email,
    password: password,
    nickname: nickname,
    first_name: firstName,
    last_name: lastName,
  };
  const url = `${API_URL}signup`;
  return apiRequest(url, "POST", data).catch((error) => console.error(error));
}
