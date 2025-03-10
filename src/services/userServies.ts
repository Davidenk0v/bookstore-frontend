import axios from "axios";

export const getMe = async (token: string, id: string) => {
  return axios.get(`/api/v1/user/userId/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
