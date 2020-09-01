import { combineReducers } from "redux";
import profile from "./profile";
import twilio from "./twilio";
import auth from "./auth";
export default combineReducers({ profile, twilio, auth });
