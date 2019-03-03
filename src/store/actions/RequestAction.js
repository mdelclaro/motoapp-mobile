import { CORRIDA_ADDED, CORRIDA_CANCELLED } from "./types";
import { uiStartLoading, uiStopLoading, authGetToken } from "./index";
import { baseUrl } from "../../config";

export const addCorrida = (origem, destino, distancia, tempo) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await fetch(`${baseUrl}corrida/`, {
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
      });

      if (result.ok) {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        dispatch(corridaAdded({ corrida: res.corrida }));
      } else {
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao chamar uma moto");
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
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
      const corrida = await fetch(`${baseUrl}corrida/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      });
      if (corrida.ok) {
        let res = await corrida.json();

        // Nenhum motoqueiro aceitou ainda
        if (!res.corrida.idMotoqueiro) {
          const result = await fetch(`${baseUrl}corrida/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token
            }
          });

          if (result.ok) {
            let res = await result.json();
            dispatch(uiStopLoading());
            dispatch(corridaCancelled());
          } else {
            dispatch(uiStopLoading());
            alert("Ocorreu um erro");
            console.log("Erro: " + err);
          }
        } else {
          alert("Erro ao cancelar. Esta corrida já foi aceita!");
        }
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
    }
  };
};

export const corridaCancelled = corrida => {
  return {
    type: CORRIDA_CANCELLED
  };
};