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
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
      username,
      password,
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });
  const { data, status } = response;
  const objectReturn = {
    data: data,
    status: status,
  };
  return objectReturn;
};
export const loginUser = async (username, password) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
      username,
      password,
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const objectReturn = {
          data: error.response.data,
          status: error.response.status,
        };
        return objectReturn;
      }
    });
  const { data, status } = response;
  const objectReturn = {
    data: data,
    status: status,
  };
  return objectReturn;
};
