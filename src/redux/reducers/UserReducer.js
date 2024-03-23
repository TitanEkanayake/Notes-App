import {
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
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  needsLogin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        needsLogin: true, // Set needsLogin to true after successful signup
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        needsLogin: false, // Reset needsLogin to false after successful login
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case FORGOT_PASSWORD_REQUEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FORGOT_PASSWORD_CHANGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOT_PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case FORGOT_PASSWORD_CHANGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState, // Ensure the flag is reset on logout
      };
    default:
      return state;
  }
};

export default userReducer;
