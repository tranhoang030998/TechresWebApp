import axios from "axios";

const com = {};

com.root = "http://localhost:8080";

com.setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default com;
