import React from "react";
import { ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";
import Main from "./screens/Main";

import { store, persistor } from "./store/configureStore";

const registerScreens = () => {
  Navigation.registerComponent(
    "motoapp.Main",
    () => () => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Main />
        </PersistGate>
      </Provider>
    ),
    () => Main
  );
  Navigation.registerComponent(
    "motoapp.Auth",
    () => () => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Auth />
        </PersistGate>
      </Provider>
    ),
    () => Auth
  );
  Navigation.registerComponent(
    "motoapp.SideMenu",
    () => () => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <SideMenu />
        </PersistGate>
      </Provider>
    ),
    () => SideMenu
  );
};

export default registerScreens;
