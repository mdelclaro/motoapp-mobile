import { MOTOQUEIRO_FETCHED } from "../actions/types";

const INITIAL_STATE = {
  motoqueiro: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOTOQUEIRO_FETCHED:
      return {
        ...state,
        motoqueiro: action.payload.motoqueiro
      };
    default:
      return state;
  }
};
