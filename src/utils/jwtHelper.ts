import { jwtDecode } from "jwt-decode";

import { DecodedToken } from "../models/auth";

// export const refreshTokenIfExpired = async (token: string): Promise<void> => {
//   if (token && !isValidToken(token)) {
//     await refreshToken();
//   }
// };

export const isValidToken = (token: string): boolean => {
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getUserId = (): string => {
  const token = JSON.parse(localStorage.getItem("token") || "{}");
  if (!token) return "";
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.sub;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const isAdmin = (): boolean => {
  const token = JSON.parse(localStorage.getItem("token") || "{}").token;
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.authorities.includes("ROLE_ADMIN");
  } catch (error) {
    console.error(error);
    return false;
  }
};
