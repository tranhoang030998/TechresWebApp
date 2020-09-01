import axios from "axios";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
// import { setAlert } from "./alert";
import com from "../../utils";
import Axios from "axios";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    com.setAuthToken(localStorage.token);
  }

  // try {
  // const res = await axios.get("/api/auth");
  if (localStorage.token) {
    dispatch({
      type: USER_LOADED,
      payload: { name: "Trung", age: 25 },
    });
  }
  // }
  // } catch (err) {
  else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  // }
};

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    // const res = await axios.post("/api/auth", body, config);
    const res = await Axios.post(`${com.root}/api/v1/staff:login`, {
      email,
      password,
    });
    console.log(res);
    if (res.data.meta.errorCode === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { ...res.data, token: "fake-token" },
      });
    } else {
      console.log("testset");
      window.alert("Invalid email and password, please try again!  ");
      dispatch({
        type: LOGIN_FAIL,
        payload: res.meta.errorMessage,
      });
    }

    dispatch(loadUser());
  } catch (err) {
    const errors = err;

    if (errors) {
      //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // const body = JSON.stringify({ name, email, password });
  const body = { displayName: name, email, password, nationality: "Vietnam" };

  try {
    const res = await axios.post(
      `${com.root}/api/v1/staff:register`,
      body,
      config
    );

    dispatch(login(email, password));

    dispatch(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;

    // if (errors) {
    // errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    // dispatch({
    //   type: REGISTER_FAIL,
    // });
    console.error(err);
  }
};

// Logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
