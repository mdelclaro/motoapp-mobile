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
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Main {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Main
  );
  Navigation.registerComponent(
    "motoapp.Auth",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Auth {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Auth
  );
  Navigation.registerComponent(
    "motoapp.SideMenu",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <SideMenu {...props} />
        </PersistGate>
      </Provider>
    ),
    () => SideMenu
  );
};

export default registerScreens;
