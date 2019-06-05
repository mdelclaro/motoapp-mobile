import { INFO_UPDATE, INFO_SET_DETAILS } from "../actions/types";

const INITIAL_STATE = {
  nome: null,
  sobrenome: null,
  email: null,
  corridas: null,
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
    case INFO_SET_DETAILS:
      return {
        ...state,
        nome: action.payload.data.nome,
        sobrenome: action.payload.data.sobrenome,
        email: action.payload.data.email,
        corridas: action.payload.data.corridas,
        imgPerfil: action.payload.data.imgPerfil
      };
    default:
      return state;
  }
};
