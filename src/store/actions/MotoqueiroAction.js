import { MOTOQUEIRO_FETCHED } from "./types";
import { uiStartLoading, uiStopLoading } from "../actions/UIAction";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpYW96b2xhQGdtYWlsLmNvbS5iciIsInVzZXJJZCI6IjVjNmI1Zjg5MTI1Y2FmNzMwNGZjZGMzOCIsImlhdCI6MTU1MTMxMDg3NCwiZXhwIjoxNTY5MzEwODc0fQ.ohA7kQjaeaM_kNzmF8AC7Eu0DVPXualmzFpFLesjat8";

export const fetchMotoqueiro = idMotoqueiro => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const result = await fetch(
        "http://192.168.2.107:8080/motoapp/v1/usuario/motoqueiro/" +
          idMotoqueiro,
        {
          method: "GET",
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
        dispatch(motoqueiroFetched({ motoqueiro: res.motoqueiro }));
      } else {
        dispatch(uiStopLoading());
        alert("Ocorreu um erro");
        console.log("Erro: " + err);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
    }
  };
};

export const motoqueiroFetched = motoqueiro => {
  return {
    type: MOTOQUEIRO_FETCHED,
    payload: motoqueiro
  };
};
