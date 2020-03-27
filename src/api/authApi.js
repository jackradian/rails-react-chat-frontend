import { API_URL } from "../utils/Constants";
import { apiRequest } from "../utils/Helpers";

export function login({ email, password }) {
  const data = {
    email: email,
    password: password
  };
  const url = `${API_URL}login`;
  return apiRequest(url, "POST", data).catch(error => console.error(error));
}
