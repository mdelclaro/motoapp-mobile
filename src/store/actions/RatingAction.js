import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const addRating = (idMotoqueiro, nota) => {
  return async dispatch => {
    console.log(idMotoqueiro);
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}avaliacao/`, {
          method: "POST",
          body: JSON.stringify({
            idMotoqueiro,
            nota
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao avaliar o motoqueiro");
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};
