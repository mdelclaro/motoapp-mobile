import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { PersistGate } from "redux-persist/integration/react";

import { Auth, Main, SideMenu, Rides, Chats, Chat } from "./screens/";
import { Camera, ProfileImage } from "./components/";

import { store, persistor } from "./store/configureStore";
import { BASE_COLOR } from "./config";

const loadingComponent = (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color={BASE_COLOR} />
  </View>
);

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: BASE_COLOR
  }
};

const providerWrapper = (props, Component) => {
  return (
    <Provider store={store}>
      <PersistGate loading={loadingComponent} persistor={persistor}>
        <PaperProvider theme={theme}>
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
  Navigation.registerComponent(
    "motoapp.Rides",
    () => props => providerWrapper(props, Rides),
    () => Rides
  );
  Navigation.registerComponent("motoapp.Camera", () => Camera);
  Navigation.registerComponent("motoapp.ProfileImage", () => ProfileImage);
};

export default registerScreens;
