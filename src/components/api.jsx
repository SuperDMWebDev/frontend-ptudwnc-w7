import axios from "axios";
export const fetchUsers = async (accessToken) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {
    headers: {
      x_authorization: accessToken,
    },
  });
  return data;
};
export const registerUser = async (username, password) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/register`,
    {
      username,
      password,
    }
  );
  return data;
};
export const loginUser = async (username, password) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/login`,
    {
      username,
      password,
    }
  );
  return data;
};
