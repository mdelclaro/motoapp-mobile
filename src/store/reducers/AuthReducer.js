import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "../actions/types";

const initialState = {
  jwt: null,
  expiryDate: null,
  userId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        jwt: action.payload.jwt,
        expiryDate: action.payload.expiryDate,
        userId: action.payload.userId
      };
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        jwt: null,
        expiryDate: null,
        userId: null
      };
    default:
      return state;
  }
};
