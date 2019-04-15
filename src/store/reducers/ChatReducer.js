import { CHAT_SET } from "../actions/types";

const INITIAL_STATE = {
  chats: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHAT_SET:
      return {
        ...state,
        chats: action.payload
      };
    default:
      return state;
  }
};
