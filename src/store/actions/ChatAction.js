import { CHAT_SET } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { timeout } from "../../utils";
import { BASE_URL } from "../../config";

export const getChats = (idCliente, page, skip, shouldSet = true) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    // const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(
          `${BASE_URL}chat/cliente/${idCliente}?page=${page}&skip=${skip}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
              // Authorization: "Bearer " + token
            }
          }
        )
      );

      if (result.ok) {
        dispatch(uiStopLoading());
        const res = await result.json();
        res.chat.forEach((item, index) => {
          res.chat[index]["count"] = res.count[index];
        });
        if (shouldSet) dispatch(setChats(res.chat));
        return res.chat;
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

export const sendMessage = (idMotoqueiro, idCliente, text) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    // const token = await dispatch(authGetToken());
    try {
      const result = await timeout(
        fetch(`${BASE_URL}mensagem/`, {
          method: "POST",
          body: JSON.stringify({
            idMotoqueiro,
            idCliente,
            sender: idCliente,
            text
          }),
          headers: {
            "Content-Type": "application/json"
            // Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        dispatch(uiStopLoading());
        const res = await result.json();
        // dispatch(setChats(res.chat));
        return res.mensagem;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        // alert("Ocorreu um erro ao buscar as conversas");
        return false;
      }
    } catch (err) {
      dispatch(uiStopLoading());
      // alert("Ocorreu um erro");
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
