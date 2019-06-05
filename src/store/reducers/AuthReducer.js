import { AUTH_SET_TOKEN } from "../actions/types";

const INITIAL_STATE = {
  jwt: null,
  expiryDate: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        jwt: action.payload.jwt,
        expiryDate: action.payload.expiryDate,
        userId: action.payload.userId
      };
    default:
      return state;
  }
};
