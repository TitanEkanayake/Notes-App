import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from "../actions/ActionTypes";

const initialState = {
  user: null,
  loading: false,
  error: null,
  needsLogin: false, // Add needsLogin to initial state
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
    case LOGOUT:
      return {
        ...initialState, // Ensure the flag is reset on logout
      };
    default:
      return state;
  }
};

export default userReducer;
