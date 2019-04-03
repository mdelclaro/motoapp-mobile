import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";
import Main from "./screens/Main";
import Camera from "./screens/Camera";
import Avatar from "./components/Avatar/Avatar";

import { store, persistor } from "./store/configureStore";

const loadingComponent = (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const registerScreens = () => {
  Navigation.registerComponent(
    "motoapp.Main",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={loadingComponent} persistor={persistor}>
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
        <PersistGate loading={loadingComponent} persistor={persistor}>
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
        <PersistGate loading={loadingComponent} persistor={persistor}>
          <SideMenu {...props} />
        </PersistGate>
      </Provider>
    ),
    () => SideMenu
  );
  Navigation.registerComponent(
    "motoapp.Camera",
    () => props => (
      <Provider store={store}>
        <PersistGate loading={loadingComponent} persistor={persistor}>
          <Camera {...props} />
        </PersistGate>
      </Provider>
    ),
    () => Camera
  );
  Navigation.registerComponent("motoapp.Avatar", () => Avatar);
};

export default registerScreens;
