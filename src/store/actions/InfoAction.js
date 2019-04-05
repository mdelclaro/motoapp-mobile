import { uiStartLoading, uiStopLoading } from "./UIAction";
import { authGetToken } from "./AuthAction";
import { INFO_UPDATE } from "./types";
import { BASE_URL } from "../../config";

import { store } from "../configureStore";

import { timeout } from "../../utils";

export const updateInfo = (
  email = null,
  senha = null,
  imgPerfil = null,
  idCliente
) => {
  return async dispatch => {
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

export const setInfo = (
  email = store.getState().info.email,
  imgPerfil = store.getState().info.imgPerfil
) => {
  return {
    type: INFO_UPDATE,
    payload: {
      email,
      imgPerfil
    }
  };
};
