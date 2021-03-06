import { uiStartLoading, uiStopLoading } from "./UIAction";
import { setInfo } from "./InfoAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const signUp = (email, senha, nome, sobrenome) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}usuario/cliente/`, {
          method: "POST",
          body: JSON.stringify({
            email,
            senha,
            nome,
            sobrenome
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
      );

      if (result.ok) {
        dispatch(uiStopLoading());
        dispatch(setInfo(email));
        return true;
      } else {
        let res = await result.json();
        alert(res.message);
        console.log(result);
        dispatch(uiStopLoading());
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Erro ao realizar o cadastro");
      console.log("Erro: " + err);
      return false;
    }
  };
};
