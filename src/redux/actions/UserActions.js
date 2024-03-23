import {
  signupUser as signupUserService,
  loginUser as loginUserService,
  forgetPassword as forgetPasswordService,
  resetPassword as resetPasswordService,
} from "../services/userServices";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST_FAILURE,
  FORGOT_PASSWORD_CHANGE_REQUEST,
  FORGOT_PASSWORD_CHANGE_SUCCESS,
  FORGOT_PASSWORD_CHANGE_FAILURE,
  LOGOUT,
} from "./ActionTypes";

// Async action creator for signing up a user
export const signupUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const res = await signupUserService(data);
      if (res.status == "400") {
        return dispatch({ type: SIGNUP_FAILURE, payload: res.message });
      } else {
        dispatch({ type: SIGNUP_SUCCESS, payload: res.user });
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
};

export const loginUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const res = await loginUserService(data);
      if (res.status == "200") {
        dispatch({ type: LOGIN_SUCCESS, payload: res.user });
      } else {
        dispatch({ type: LOGIN_FAILURE, payload: res.message });
      }
      return res;
    } catch (error) {
      console.log(error.message);
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const forgetPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    try {
      const res = await forgetPasswordService(data);
      if (res.status == "200") {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_SUCCESS,
          payload: data.email,
        });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_REQUEST_FAILURE,
          payload: res.message,
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: FORGOT_PASSWORD_CHANGE_REQUEST });
    try {
      const res = await resetPasswordService(data);
      if (res.status == "200") {
        dispatch({ type: FORGOT_PASSWORD_CHANGE_SUCCESS });
      } else {
        dispatch({
          type: FORGOT_PASSWORD_CHANGE_FAILURE,
          payload: res.message,
        });
      }
      return res;
    } catch (error) {
      dispatch({
        type: FORGOT_PASSWORD_CHANGE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
