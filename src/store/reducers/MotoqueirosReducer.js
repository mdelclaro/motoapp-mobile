import { MOTOQUEIROS_UPDATE } from "../actions/types";

const INITIAL_STATE = {
  motoqueiros: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOTOQUEIROS_UPDATE:
      return {
        ...state,
        motoqueiros: action.payload
      };
    default:
      return state;
  }
};
