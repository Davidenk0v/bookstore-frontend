import axios from "axios";
import { BASE_URL } from "./utils/consts";
import { AuthLogin } from "./models/auth";

export const login = async (login: AuthLogin) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, login);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    return error;
  }
};
