import { FORM_EMAIL_CHANGED, FORM_SENHA_CHANGED } from "../actions/types";

const INITIAL_STATE = {
  email: "",
  senha: ""
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
    default:
      return state;
  }
};
