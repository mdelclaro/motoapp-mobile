import { FORM_EMAIL_CHANGED, FORM_SENHA_CHANGED } from "./types";

export const emailChanged = email => {
  return {
    type: FORM_EMAIL_CHANGED,
    payload: email
  };
};

export const senhaChanged = senha => {
  return {
    type: FORM_SENHA_CHANGED,
    payload: senha
  };
};
