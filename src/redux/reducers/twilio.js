import {
  GET_TWILIO_USER_START,
  GET_TWILIO_USER_SUCCESS,
  GET_TWILIO_USER_ERROR,
  FETCH_TWILIO_MESSAGES,
  FETCH_TWILIO_MESSAGES_ERROR,
  GET_TWILIO_CHANNEL,
  GET_TWILIO_CHANNEL_ERROR,
  FETCH_TWILIO_MESSAGES_START,
  FETCH_TWILIO_MESSAGES_SUCCESS,
} from "../actions/types";

const initialState = {
  twilioUser: [],
  error: {},
  errorLoadingUser: null,
  loadingUser: false,
  loadingMessages: false,
  messages: [],
  currentChannel: null,
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TWILIO_USER_START:
      return {
        ...state,
        loadingUser: true,
      };
    case GET_TWILIO_USER_SUCCESS:
      return {
        ...state,
        twilioUser: payload,
        loadingUser: false,
      };
    case GET_TWILIO_USER_ERROR:
      return {
        ...state,
        errorLoadingUser: payload,
        loadingUser: false,
      };

    case GET_TWILIO_CHANNEL:
      return {
        ...state,
        currentChannel: payload,
        loading: false,
      };

    case GET_TWILIO_CHANNEL_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FETCH_TWILIO_MESSAGES_START:
      return {
        ...state,
        loadingMessages: true,
      };
    case FETCH_TWILIO_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
        loadingMessages: false,
      };
    case FETCH_TWILIO_MESSAGES_ERROR:
      return {
        ...state,
        error: payload,
        loadingMessages: false,
      };
    default:
      return state;
  }
}
