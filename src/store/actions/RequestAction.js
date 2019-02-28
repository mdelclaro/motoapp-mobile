import { CORRIDA_ADDED, CORRIDA_CANCELLED } from "./types";
import { uiStartLoading, uiStopLoading } from "../actions/UIAction";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpYW96b2xhQGdtYWlsLmNvbS5iciIsInVzZXJJZCI6IjVjNmI1Zjg5MTI1Y2FmNzMwNGZjZGMzOCIsImlhdCI6MTU1MTMxMDg3NCwiZXhwIjoxNTY5MzEwODc0fQ.ohA7kQjaeaM_kNzmF8AC7Eu0DVPXualmzFpFLesjat8";

export const addCorrida = (origem, destino, distancia, tempo) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const result = await fetch(
        "http://192.168.2.107:8080/motoapp/v1/corrida/",
        {
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
        }
      );

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
    try {
      const corrida = await fetch(
        "http://192.168.2.107:8080/motoapp/v1/corrida/" + id,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      );
      if (corrida.ok) {
        let res = await corrida.json();

        // Nenhum motoqueiro aceitou ainda
        if (!res.corrida.idMotoqueiro) {
          const result = await fetch(
            "http://192.168.2.107:8080/motoapp/v1/corrida/" + id,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
              }
            }
          );

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
