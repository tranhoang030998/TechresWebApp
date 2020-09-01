import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const initialState = {
  token: window.localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userDisplayName: localStorage.userName,
        currentStaffId: localStorage.currentStaffId,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userName", payload.data.user.displayName);
      localStorage.setItem("currentStaffId", payload.data.id);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: payload,
      };

    default:
      return state;
  }
}
