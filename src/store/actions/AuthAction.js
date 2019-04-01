import { AsyncStorage } from "react-native";
import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./types";
import { uiStartLoading, uiStopLoading } from "./UIAction";
import { BASE_URL } from "../../config";

import startApp from "../../App";
import { timeout } from "../../utils";

export const authAutoSignIn = () => {
  return async dispatch => {
    try {
      dispatch(uiStartLoading());
      await dispatch(authGetToken());
      startApp();
    } catch (err) {
      console.log(err);
      dispatch(uiStopLoading());
    }
  };
};

export const tryAuth = (email, senha) => {
  return async dispatch => {
    dispatch(uiStartLoading());
    try {
      const result = await fetch(`${BASE_URL}auth/cliente/`, {
        method: "POST",
        body: JSON.stringify({
          email,
          senha
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (result.ok) {
        let res = await result.json();
        const { token, refreshToken, userId, expiryDate } = res;

        dispatch(storeAuth(token, refreshToken, userId, expiryDate));
        startApp();
        dispatch(uiStopLoading());
      } else {
        let res = await result.json();
        alert(res.message);
        console.log(result);
        dispatch(uiStopLoading());
      }
    } catch (err) {
      dispatch(uiStopLoading());
      alert("Não foi possível fazer o login");
      console.log("Erro: " + err);
    }
  };
};

export const storeAuth = (jwt, refreshToken, userId, expiryDate) => {
  return async dispatch => {
    dispatch(authSetToken(jwt, expiryDate, userId));
    AsyncStorage.setItem("ap:auth:jwt", jwt);
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate);
    AsyncStorage.setItem("ap:auth:userId", userId);
  };
};

export const authSetToken = (jwt, expiryDate, userId) => {
  return {
    type: AUTH_SET_TOKEN,
    payload: {
      jwt,
      expiryDate,
      userId
    }
  };
};

export const authGetToken = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.jwt;
    const stateExpiryDate = getState().auth.expiryDate;
    // verificar se token do state eh valido
    if (!token || new Date(stateExpiryDate) <= new Date()) {
      console.log("Sem token no state ou invalido");
      try {
        const fetchedToken = await AsyncStorage.getItem("ap:auth:jwt");
        const expiryDate = await AsyncStorage.getItem("ap:auth:expiryDate");
        const userId = await AsyncStorage.getItem("ap:auth:userId");

        // verificar se token do storage eh valido
        if (!fetchedToken || new Date(expiryDate) <= new Date()) {
          //needs to be refreshed
          const refreshToken = await AsyncStorage.getItem(
            "ap:auth:refreshToken"
          );
          console.log("vai chamar");
          const result = await timeout(
            fetch(`${BASE_URL}auth/cliente/refreshToken/`, {
              method: "POST",
              body: JSON.stringify({
                refreshToken
              }),
              headers: {
                "Content-Type": "application/json"
              }
            })
          );
          console.log("chamou");

          if (result.ok) {
            let res = await result.json();
            const { token, refreshToken, userId, expiryDate } = res;

            dispatch(storeAuth(token, refreshToken, userId, expiryDate));
            return token;
          } else {
            error = new Error("Realizar login");
            throw Error();
          }
        } else {
          dispatch(authSetToken(fetchedToken, expiryDate, userId));
          return fetchedToken;
        }
      } catch (err) {
        throw err;
      }
    } else {
      return token;
    }
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
    AsyncStorage.removeItem("ap:auth:refreshToken");
    AsyncStorage.removeItem("ap:auth:userId");
  };
};

export const authLogout = () => {
  return async dispatch => {
    await dispatch(authClearStorage());
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  };
};
