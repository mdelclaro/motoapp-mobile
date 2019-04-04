import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";
import MenuItem from "../components/UI/MenuItem";

import { BASE_COLOR, IMAGES_URL } from "../config";

class Menu extends Component {
  renderImage() {
    let uri;
    let imageComponent;

    // if (this.props.imgPerfil) {
    uri = {
      uri: IMAGES_URL + this.props.imgPerfil
    };
    imageComponent = <FastImage source={uri} style={styles.image} fallback />;
    // } else {
    //   uri = require("../assets/avatar/avatar.png");
    //   imageComponent = <Image source={uri} style={styles.image} />;
    // }
    return (
      <Fragment>
        <TouchableOpacity onPress={() => this.renderAvatar(uri)}>
          {imageComponent}
        </TouchableOpacity>
        <View style={styles.imageIconContainer}>
          <TouchableOpacity
            style={styles.imageIcon}
            onPress={this.renderCamera}
          >
            <Icon
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={25}
              color="#4e4e4f"
            />
          </TouchableOpacity>
        </View>
      </Fragment>
    );
  }

  renderCamera = () => {
    Navigation.showModal({
      stack: {
        id: "infoStack",
        children: [
          {
            component: {
              id: "camera",
              name: "motoapp.Camera"
            }
          }
        ]
      }
    });
  };

  renderAvatar = async uri => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: "motoapp.ProfileImage",
              passProps: {
                uri
              },
              options: {
                topBar: {
                  visible: true,
                  drawBehind: true,
                  noBorder: true,
                  elevation: 0,
                  background: { color: "transparent" }
                }
              }
            }
          }
        ]
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0, justifyContent: "center" }}>
          {this.renderImage()}
        </View>
        <MenuItem onPress={this.props.onLogout} icon="person" text="Perfil" />
        <MenuItem
          onPress={this.props.onLogout}
          icon="chatboxes"
          text="Mensagens"
        />
        <MenuItem
          onPress={this.props.onLogout}
          icon="settings"
          text="Configurações"
        />
        <MenuItem onPress={this.props.onLogout} icon="log-out" text="Sair" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "#f8f8f8",
    flex: 1
  },
  image: {
    alignSelf: "center",
    paddingBottom: 15,
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: BASE_COLOR
  },
  imageIconContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  imageIcon: {
    backgroundColor: "#e4e4e4",
    flex: 0,
    borderRadius: 100,
    height: 30,
    width: 30,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 50,
    bottom: -10
  }
});

const mapStateToProps = state => {
  return {
    imgPerfil: state.info.imgPerfil
  };
};

export default connect(mapStateToProps)(Menu);
