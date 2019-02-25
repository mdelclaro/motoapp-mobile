import { CORRIDA_ADDED, CORRIDA_CANCELLED } from "../actions/types";

const INITIAL_STATE = {
  corrida: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CORRIDA_ADDED:
      return {
        ...state,
        corrida: action.payload.corrida
      };
    case CORRIDA_CANCELLED:
      return {
        ...state,
        corrida: null
      };
    default:
      return state;
  }
};
