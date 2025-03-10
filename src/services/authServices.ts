import axios from "axios";

import { AuthLogin } from "../models/auth";

export const login = async (login: AuthLogin) => {
  return await axios.post(`/api/auth/login`, login);
};

export const register = async (login: AuthLogin) => {
  return await axios.post(`/auth/register`, login);
};
