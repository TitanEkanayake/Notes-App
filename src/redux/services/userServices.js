import axios from "axios";

const URL = import.meta.env.VITE_ENDPOINTURL;

export const signupUser = async (user) => {
  try {
    const response = await axios.post(`${URL}/users/signup`, user);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred during signup."
    );
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(`${URL}/users/login`, user);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "An error occurred during login."
    );
  }
};

export const forgetPassword = async (data) => {
  try {
    const response = await axios.post(`${URL}/users/forgot-password`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred during forget password."
    );
  }
};

export const resetPassword = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(`${URL}/users/reset-password`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred during reset password."
    );
  }
};
