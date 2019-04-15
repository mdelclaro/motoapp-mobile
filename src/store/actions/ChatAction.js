import { CHAT_SET } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const getChats = idCliente => {
  return async dispatch => {
    dispatch(uiStartLoading());
    console.log(`${BASE_URL}chat/cliente/${idCliente}`);
    // const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}chat/cliente/${idCliente}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
            // Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        dispatch(uiStopLoading());
        const res = await result.json();
        dispatch(setChats(res.chat));
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        alert("Ocorreu um erro ao buscar as conversas");
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

export const setChats = chats => {
  return {
    type: CHAT_SET,
    payload: chats
  };
};
