import React, { Component, Fragment } from "react";
import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import { getImageSource } from "react-native-vector-icons/Ionicons";
import io from "socket.io-client";

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
      // this.props.updateMotoqueiros([
      //   {
      //     coords: {
      //       lat: -21.789099999999998,
      //       long: -46.563498333333335
      //     },
      //     userId: "5c9e5c82ab18dc35c05f635"
      //   },
      //   {
      //     coords: {
      //       lat: -21.793,
      //       long: -46.564
      //     },
      //     userId: "5c9e5c82a18dc35c05f1635"
      //   },
      //   {
      //     coords: {
      //       lat: -21.7935,
      //       long: -46.5649
      //     },
      //     userId: "c9e5c82ab18dc35c05f1635"
      //   }
      // ]);
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
        <Map motoqueiros={this.props.motoqueiros} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    motoqueiros: state.motoqueiros.motoqueiros
  };
};

const mapDispatchToProps = {
  updateMotoqueiros: motoqueiros => updateMotoqueiros(motoqueiros)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
