import {
  signupUser as signupUserService,
  loginUser as loginUserService,
} from "../services/userServices";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "./ActionTypes";
// Async action creator for signing up a user
export const signupUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_REQUEST });
    try {
      const data = await signupUserService(user);
      if (data.status == "400") {
        return dispatch({ type: SIGNUP_FAILURE, payload: data.message });
      } else {
        dispatch({ type: SIGNUP_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: SIGNUP_FAILURE, payload: error.message });
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const data = await loginUserService(credentials);
      if (data.status == "400") {
        dispatch({ type: LOGIN_FAILURE, payload: data.message });
      } else {
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
      }
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
  };
};
