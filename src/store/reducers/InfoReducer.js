import { INFO_UPDATE } from "../actions/types";

const INITIAL_STATE = {
  email: null,
  imgPerfil: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INFO_UPDATE:
      return {
        ...state,
        email: action.payload.email,
        imgPerfil: action.payload.imgPerfil
      };
    default:
      return state;
  }
};
