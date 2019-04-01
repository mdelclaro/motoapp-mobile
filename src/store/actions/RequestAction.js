import { CORRIDA_ADDED, CORRIDA_CANCELLED } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const addCorrida = (origem, destino, distancia, tempo) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}corrida/`, {
          method: "POST",
          body: JSON.stringify({
            origem,
            destino,
            distancia,
            tempo,
            status: "0"
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        dispatch(uiStopLoading());
        dispatch(corridaAdded({ corrida: res.corrida }));
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao chamar uma moto");
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

export const corridaAdded = corrida => {
  return {
    type: CORRIDA_ADDED,
    payload: corrida
  };
};

export const cancelCorrida = id => {
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const corrida = await timeout(
        fetch(`${BASE_URL}corrida/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );
      if (corrida.ok) {
        let res = await corrida.json();

        // Nenhum motoqueiro aceitou ainda
        if (!res.corrida.idMotoqueiro) {
          const result = await timeout(
            fetch(`${BASE_URL}corrida/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
              }
            })
          );

          if (result.ok) {
            dispatch(uiStopLoading());
            dispatch(corridaCancelled());
            return true;
          } else {
            dispatch(uiStopLoading());
            alert("Ocorreu um erro");
            console.log("Erro: " + err);
            return false;
          }
        } else {
          alert("Erro ao cancelar. Esta corrida já foi aceita!");
          return false;
        }
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const corridaCancelled = corrida => {
  return {
    type: CORRIDA_CANCELLED
  };
};
