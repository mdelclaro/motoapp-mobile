import { MOTOQUEIRO_FETCHED, MOTOQUEIRO_DISTANCIA } from "../actions/types";

const INITIAL_STATE = {
  motoqueiro: null,
  distancia: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MOTOQUEIRO_FETCHED:
      return {
        ...state,
        motoqueiro: action.payload.motoqueiro
      };
    case MOTOQUEIRO_DISTANCIA:
      return {
        ...state,
        distancia: action.payload.distancia
      };
    default:
      return state;
  }
};
