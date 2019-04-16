import { RIDES_SET } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const getRides = idCliente => {
  return async dispatch => {
    dispatch(uiStartLoading());
    const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}usuario/cliente/${idCliente}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        const res = await result.json();
        dispatch(setRides(res.cliente.corridas));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao buscar as corridas");
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

export const setRides = rides => {
  return {
    type: RIDES_SET,
    payload: rides
  };
};
