import axios from "axios";

export const getAllBooks = async (token: string) => {
  return axios.get(`/api/v1/book/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getBookByIsbn = async (token: string, isbn: string) => {
  return axios.get(`/api/v1/book/${isbn}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
