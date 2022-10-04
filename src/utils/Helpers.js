import { DEFAULT_USER_AUTH } from "./Constants";

// Return user auth from local storage value
export const getStoredUserAuth = () => {
  const auth = window.localStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

// API request
export const apiRequest = async (url, method, bodyParams) => {
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: bodyParams ? JSON.stringify(bodyParams) : undefined,
  });
  return await response.json();
};
