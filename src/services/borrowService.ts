import axios from "axios";
import { BorrowRequest } from "../models/borrow";

export const newBorrow = async (token: string, borrow: BorrowRequest) => {
  return axios.post(`/api/v1/borrow/new`, borrow, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getUserBorrows = async (token: string, id: string) => {
  return axios.get(`/api/v1/borrow/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const returnBorrow = async (token: string, id: string) => {
  return axios.put(
    `/api/v1/borrow/return/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
