import axios from "axios";
import { BASE_URL } from "../utils/consts";
import { AuthLogin } from "../models/auth";

export const login = async (login: AuthLogin) => {
  return await axios.post(`${BASE_URL}/api/auth/login`, login);
};

export const register = async (login: AuthLogin) => {
  return await axios.post(`${BASE_URL}/auth/register`, login);
};
