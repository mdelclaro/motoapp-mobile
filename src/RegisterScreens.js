import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import Auth from "./screens/Auth";
import SideMenu from "./screens/SideMenu";

import Main from "./screens/Main";

import configureStore from "./store/configureStore";

const store = configureStore();

const registerScreens = () => {
  Navigation.registerComponentWithRedux(
    "motoapp.Main",
    () => Main,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "motoapp.Auth",
    () => Auth,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "motoapp.SideMenu",
    () => SideMenu,
    Provider,
    store
  );
};

export default registerScreens;
