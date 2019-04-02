import React, { Component, Fragment } from "react";
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { getImageSource } from "react-native-vector-icons/Ionicons";

import { updateMotoqueiros } from "../store/actions";

import { BASE_COLOR, SOCKET_URL } from "../config";
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
      BASE_COLOR
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
          selectedIconColor: BASE_COLOR,
          textColor: BASE_COLOR,
          selectedTextColor: BASE_COLOR
        }
      });
    });
    this.socket;
  }

  componentDidMount() {
    //criar conexão com timeout
    this.socket = io(SOCKET_URL, {
      timeout: 3000
    });

    //tratar evento
    this.socket.on("fetchMotoqueiros", data => {
      this.props.updateMotoqueiros(data.motoqueiros);
    });
  }

  componentWillUnmount() {
    if (this.socket.connected) this.socket.disconnect();
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

mapDispatchToProps = {
  updateMotoqueiros: motoqueiros => updateMotoqueiros(motoqueiros)
};

export default connect(
  null,
  updateMotoqueiros
)(Main);
