import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions
} from "react-native";
import Icon, { getImageSource } from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import { connect } from "react-redux";

import Avatar from "../components/Avatar/Avatar";
import { BASE_COLOR, BASE_COLOR_ERROR, IMAGES_URL } from "../config";

class Menu extends Component {
  renderImage() {
    let uri;
    if (this.props.imgPerfil) {
      uri = IMAGES_URL + this.props.imgPerfil;
    } else {
      uri = require("../assets/avatar/avatar.png");
    }
    return (
      <Fragment>
        <TouchableOpacity onPress={() => this.renderAvatar(uri)}>
          <FastImage source={{ uri }} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageIconContainer}
          onPress={this.renderCamera}
        >
          <Icon
            name={Platform.OS === "android" ? "md-create" : "ios-create"}
            size={30}
            color="#4e4e4f"
            style={styles.imageIcon}
          />
        </TouchableOpacity>
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
    const icon = await getImageSource(
      Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      35,
      BASE_COLOR
    );

    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: "motoapp.Avatar",
              passProps: {
                icon,
                uri
              },
              options: {
                topBar: {
                  drawBehind: true,
                  noBorder: true,
                  elevation: 0,
                  background: { color: "transparent" },
                  backButton: { icon }
                }
              }
            }
          }
        ]
      }
    });

    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: "motoapp.Avatar",
    //     passProps: {
    //       icon,
    //       uri
    //     },
    //     options: {
    //       topBar: {
    //         leftButtons: [
    //           {
    //             visible: true,
    //             id: "imgBackButton",
    //             icon: icon
    //           }
    //         ]
    //       }
    //     }
    //   }
    // });
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
  imageIcon: {
    flex: 1,
    backgroundColor: "#e4e4e4",
    borderRadius: 50,
    paddingLeft: 5,
    paddingRight: 5,
    margin: 1
  },
  imageIconContainer: {
    position: "absolute",
    padding: 5,
    right: 75,
    bottom: 0
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
