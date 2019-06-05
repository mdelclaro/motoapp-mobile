import React, { Component, Fragment } from 'react';
import { Platform, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
// import { getImageSource } from "react-native-vector-icons/Ionicons";
import { getImageSource } from 'react-native-vector-icons/Feather';
import io from 'socket.io-client';

import { updateMotoqueiros } from '../store/actions';

import { BASE_COLOR, SOCKET_URL } from '../config';
import Map from '../components/Map/Map';

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
        background: { color: 'transparent' }
      }
    };
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    getImageSource(
      // Platform.OS === "android" ? "md-menu" : "ios-menu",
      'menu',
      30,
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions('Main', {
        topBar: {
          visible: true,
          rightButtons: [
            {
              id: 'menuButton',
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
    // this.keyboardDidShowListener = Keyboard.addListener(this.keyboardDidShow);
    // this.keyboardDidHideListener = Keyboard.addListener(this.keyboardDidHide);

    //criar conexão com timeout
    this.socket = io(SOCKET_URL, {
      timeout: 3000
    });

    //tratar evento
    this.socket.on('fetchMotoqueiros', data => {
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
    // this.keyboardDidShowListener.remove();
    // this.keyboardDidHideListener.remove();
    if (this.socket.connected) this.socket.disconnect();
  }

  // keyboardDidShow() {
  //   Navigation.mergeOptions(componentId, {
  //     bottomTabs: {
  //       visible: false,
  //       animate: false,
  //       ...Platform.select({ android: { drawBehind: true } })
  //     }
  //   });
  // }

  // keyboardDidHide() {
  //   Navigation.mergeOptions(componentId, {
  //     bottomTabs: {
  //       visible: true,
  //       animate: false,
  //       ...Platform.select({ android: { drawBehind: false } })
  //     }
  //   });
  // }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'menuButton') {
      Navigation.mergeOptions('Main', {
        sideMenu: {
          right: {
            visible: true
          }
        }
      });
    }
  }

  _keyboardDidShow() {
    //   Navigation.mergeOptions('Main', {
    //     bottomTabs: { visible: false, drawBehind: true, animated: false }
    //   });
  }

  _keyboardDidHide() {
    //   Navigation.mergeOptions('Main', {
    //     bottomTabs: { visible: true, drawBehind: false, animated: false }
    //   });
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} enabled>
        <Map motoqueiros={this.props.motoqueiros} />
      </KeyboardAvoidingView>
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
