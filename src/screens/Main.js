import React, { Component, Fragment } from "react";
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { getImageSource } from "react-native-vector-icons/Ionicons";

import { baseColor } from "../config";
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
      baseColor
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          visible: true,
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ]
        },
        bottomTab: {
          selectedIconColor: baseColor,
          textColor: baseColor,
          selectedTextColor: baseColor
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
    return (
      <Fragment>
        <Map />
      </Fragment>
    );
  }
}

export default Main;
