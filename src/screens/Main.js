import React, { Component } from "react";
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";

import Map from "../components/Map/Map";

class Main extends Component {
  static get options() {
    return {
      topBar: {
        animate: true,
        drawBehind: true,
        transparent: true,
        translucent: true,
        noBorder: true,
        elevation: 0,
        background: { color: "transparent" }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    getImageSource(
      Platform.OS === "android" ? "md-menu" : "ios-menu",
      30,
      "#29aaf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ]
        },
        // bottomTabs: {
        //   backgroundColor: "#425cf4"
        // },
        bottomTab: {
          selectedIconColor: "#29aaf4",
          textColor: "#29aaf4",
          selectedTextColor: "#29aaf4"
        }
      });
    });
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "menuButton") {
      Navigation.mergeOptions("Main", {
        sideMenu: {
          right: {
            visible: true
          }
        }
      });
    }
  }

  render() {
    return <Map />;
  }
}

export default Main;
