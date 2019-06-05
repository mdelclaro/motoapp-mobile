import React, { Component, Fragment } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Navigation } from "react-native-navigation";
import FastImage from "react-native-fast-image";
import ImagePicker from "react-native-image-picker";
import { connect } from "react-redux";

import { updateInfo, authLogout } from "../store/actions/";

import MenuItem from "../components/UI/MenuItem";
import CustomIcon from "../components/UI/CustomIcon";

import { BASE_COLOR, BACKGROUND_COLOR, IMAGES_URL } from "../config";

class Menu extends Component {
  state = {
    uri: IMAGES_URL + this.props.imgPerfil
  };

  handleEdit = () => {
    Alert.alert(
      "Editar avatar",
      "Escolha uma opção para editar a sua imagem de perfil",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Tirar foto",
          onPress: () => {
            this.renderCamera();
          }
        },
        {
          text: "Escolher existente",
          onPress: () => {
            const options = {
              noData: true,
              permissionDenied: {
                title: "Permissão negada",
                text:
                  "Para poder escolher uma imagem existente precisamos de sua permissão para acessar o armazenamento do dispositivo.",
                reTryTitle: "Conceder permissão",
                okTitle: "Ok"
              }
            };

            ImagePicker.launchImageLibrary(options, response => {
              const { uri } = response;
              if (uri) {
                this.handleUpload(uri);
              }
            });
          }
        }
      ],
      { cancelable: true }
    );
  };

  handleUpload(uri) {
    const { updateInfo, userId, imgPerfil } = this.props;
    updateInfo(uri, userId);
    this.setState({ uri: IMAGES_URL + imgPerfil });
  }

  handleLogout = async () => {
    await this.props.authLogout();
    Navigation.setRoot({
      root: {
        component: {
          name: "motoapp.Auth"
        }
      }
    });
  };

  renderImage() {
    const uri = IMAGES_URL + this.props.imgPerfil;
    return (
      <Fragment>
        <TouchableOpacity onPress={this.renderAvatar}>
          <FastImage source={{ uri }} style={styles.image} fallback />
        </TouchableOpacity>
        <View style={styles.imageIconContainer}>
          <TouchableOpacity style={styles.imageIcon} onPress={this.handleEdit}>
            <CustomIcon icon={"edit-2"} size={25} color="#4e4e4f" />
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
              name: "motoapp.Camera",
              passProps: {
                handleUpload: uri => this.handleUpload(uri)
              }
            }
          }
        ]
      }
    });
  };

  renderChat = () => {
    Navigation.showModal({
      stack: {
        id: "chats",
        children: [
          {
            component: {
              id: "chats",
              name: "motoapp.Chats",
              options: {
                topBar: {
                  drawBehind: true
                }
              }
            }
          }
        ]
      }
    });
  };

  renderAvatar = () => {
    const uri = { uri: IMAGES_URL + this.props.imgPerfil };
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: "motoapp.ProfileImage",
              passProps: { uri },
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

  renderRides = () => {
    Navigation.showModal({
      stack: {
        id: "rides",
        children: [
          {
            component: {
              id: "rides",
              name: "motoapp.Rides",
              passProps: { rides: 1 },
              options: {
                topBar: {
                  drawBehind: true
                }
              }
            }
          }
        ]
      }
    });
  };

  renderProfile = () => {
    Navigation.showModal({
      stack: {
        id: "profile",
        children: [
          {
            component: {
              id: "profile",
              name: "motoapp.Profile",
              options: {
                topBar: {
                  drawBehind: true
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
        <MenuItem onPress={this.renderProfile} icon="user" text="Perfil" />
        <MenuItem
          onPress={this.renderChat}
          icon="message-circle"
          text="Mensagens"
        />
        <MenuItem onPress={this.renderRides} icon="map" text="Minhas viagens" />
        <MenuItem onPress={this.handleLogout} icon="log-out" text="Sair" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: BACKGROUND_COLOR,
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
    imgPerfil: state.info.imgPerfil,
    userId: state.auth.userId,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  updateInfo: (imgPerfil, idCliente) => updateInfo({ imgPerfil, idCliente }),
  authLogout: () => authLogout()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
