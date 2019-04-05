import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";
import Main from "./screens/Main";
import Camera from "./components/Camera/Camera";
import ProfileImage from "./components/ProfileImage/ProfileImage";

import { store, persistor } from "./store/configureStore";

const loadingComponent = (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" />
  </View>
);

const providerWrapper = (props, Component) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        <Component {...props} />
      </PersistGate>
    </Provider>
  );
};

const registerScreens = () => {
  Navigation.registerComponent(
    "motoapp.Main",
    () => props => providerWrapper(props, Main),
    () => Main
  );
  Navigation.registerComponent(
    "motoapp.Auth",
    () => props => providerWrapper(props, Auth),
    () => Auth
  );
  Navigation.registerComponent(
    "motoapp.SideMenu",
    () => props => providerWrapper(props, SideMenu),
    () => SideMenu
  );
  Navigation.registerComponent("motoapp.Camera", () => Camera);
  Navigation.registerComponent("motoapp.ProfileImage", () => ProfileImage);
};

export default registerScreens;
