import { BASE_URL } from "../utils/consts";

export const getAllBooks = async (token: string) => {
  return await fetch(`/api/v1/book/all`, {
    method: "GET",
    credentials: "include", // Importante si usas cookies/sesiones
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
