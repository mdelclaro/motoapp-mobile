import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";
import Main from "./screens/Main";
import Chats from "./components/Chat/Chats";
import Chat from "./components/Chat/Chat";
import Camera from "./components/Camera/Camera";
import ProfileImage from "./components/ProfileImage/ProfileImage";

import { store, persistor } from "./store/configureStore";
import { BASE_COLOR } from "./config";

const loadingComponent = (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={BASE_COLOR} />
  </View>
);

const providerWrapper = (props, Component) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        <PaperProvider>
          <Component {...props} />
        </PaperProvider>
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
  Navigation.registerComponent(
    "motoapp.Chats",
    () => props => providerWrapper(props, Chats),
    () => Chats
  );
  Navigation.registerComponent(
    "motoapp.Chat",
    () => props => providerWrapper(props, Chat),
    () => Chat
  );
  Navigation.registerComponent("motoapp.Camera", () => Camera);
  Navigation.registerComponent("motoapp.ProfileImage", () => ProfileImage);
};

export default registerScreens;
