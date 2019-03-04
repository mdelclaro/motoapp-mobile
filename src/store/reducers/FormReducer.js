import {
  FORM_EMAIL_CHANGED,
  FORM_SENHA_CHANGED,
  FORM_NOME_CHANGED,
  FORM_SOBRENOME_CHANGED,
  FORM_CLEAR
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  senha: "",
  nome: "",
  sobrenome: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORM_EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case FORM_SENHA_CHANGED:
      return {
        ...state,
        senha: action.payload
      };
    case FORM_NOME_CHANGED:
      return {
        ...state,
        nome: action.payload
      };
    case FORM_SOBRENOME_CHANGED:
      return {
        ...state,
        sobrenome: action.payload
      };
    case FORM_CLEAR:
      return {
        ...state,
        nome: "",
        sobrenome: "",
        email: "",
        senha: ""
      };
    default:
      return state;
  }
};
