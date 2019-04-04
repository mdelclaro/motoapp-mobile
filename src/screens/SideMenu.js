import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import Icon, { getImageSource } from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";

import { BASE_COLOR, BASE_COLOR_ERROR, IMAGES_URL } from "../config";

class Menu extends Component {
  renderImage() {
    let uri;
    let imageComponent;
    if (this.props.imgPerfil) {
      uri = { uri: IMAGES_URL + this.props.imgPerfil };
      imageComponent = <FastImage source={uri} style={styles.image} fallback />;
    } else {
      uri = require("../assets/avatar/avatar.png");
      imageComponent = <Image source={uri} style={styles.image} />;
    }
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
              name: "motoapp.Avatar",
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
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
              size={30}
              color={BASE_COLOR}
              style={styles.drawerItemIcon}
            />
            <Text>Perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={
                Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
              }
              size={30}
              color={BASE_COLOR}
              style={styles.drawerItemIcon}
            />
            <Text>Mensagens</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-settings" : "ios-settings"}
              size={30}
              color={BASE_COLOR}
              style={styles.drawerItemIcon}
            />
            <Text>Configurações</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color={BASE_COLOR_ERROR}
              style={styles.drawerItemIcon}
            />
            <Text>Sair</Text>
          </View>
        </TouchableOpacity>
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
  },
  drawerItemFirst: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

const mapStateToProps = state => {
  return {
    imgPerfil: state.info.imgPerfil
  };
};

export default connect(mapStateToProps)(Menu);
