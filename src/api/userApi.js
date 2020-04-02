import { API_URL } from "../utils/Constants";
import { apiRequest } from "../utils/Helpers";

export function myDirectRooms() {
  const url = `${API_URL}my_direct_rooms`;
  return apiRequest(url, "GET", null).catch(error => console.error(error));
}
