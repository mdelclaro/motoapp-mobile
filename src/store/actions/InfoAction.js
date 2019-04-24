import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { INFO_UPDATE, INFO_SET_DETAILS } from "./types";
import { BASE_URL } from "../../config";

import { timeout } from "../../utils";

export const updateInfo = data => {
  return async dispatch => {
    const { email, senha, imgPerfil, idCliente } = data;
    dispatch(uiStartLoading());
    try {
      const token = await dispatch(authGetToken());
      let formData = new FormData();

      if (email) {
        formData.append("email", email);
      }

      if (senha) {
        formData.append("senha", senha);
      }

      if (imgPerfil) {
        formData.append("imgPerfil", {
          uri: imgPerfil,
          type: "image/jpg",
          name: "imgPerfil"
        });
      }

      const result = await timeout(
        fetch(`${BASE_URL}usuario/cliente/${idCliente}`, {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + token
          }
        })
      );

      if (result.ok) {
        let res = await result.json();
        let { imgPerfil, email } = res.cliente;

        // sanitize uri
        if (imgPerfil) {
          imgPerfil = imgPerfil.split("images")[1];
          imgPerfil = imgPerfil.replace("/", "");
          imgPerfil = imgPerfil.replace("\\", "");
        } else {
          imgPerfil = "avatar.png";
        }

        dispatch(setInfo(email, imgPerfil));
        dispatch(uiStopLoading());
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        dispatch(uiStopLoading());
        throw new Error(res.message);
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Erro ao atualizar as informações");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const setInfo = (email, imgPerfil) => {
  return {
    type: INFO_UPDATE,
    payload: {
      email,
      imgPerfil
    }
  };
};

export const getDetails = idCliente => {
  return async dispatch => {
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
        let res = await result.json();
        const { nome, sobrenome, email, corridas } = res.cliente;

        // sanitize uri imgPerfil
        let imgPerfil = res.cliente.imgPerfil;
        if (imgPerfil) {
          imgPerfil = imgPerfil.split("images")[1];
          imgPerfil = imgPerfil.replace("/", "");
          imgPerfil = imgPerfil.replace("\\", "");
        } else {
          imgPerfil = "avatar.png";
        }

        const data = {
          nome,
          sobrenome,
          email,
          corridas,
          imgPerfil
        };

        await dispatch(setDetails(data));
        return true;
      } else {
        let res = await result.json();
        console.log(res);
        alert("Ocorreu um erro ao avaliar o motoqueiro");
        return false;
      }
    } catch (err) {
      alert("Ocorreu um erro");
      console.log("Erro: " + err);
      return false;
    }
  };
};

export const setDetails = data => {
  return {
    type: INFO_SET_DETAILS,
    payload: {
      data
    }
  };
};
