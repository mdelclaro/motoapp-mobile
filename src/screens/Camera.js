import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Platform
} from "react-native";
import { RNCamera } from "react-native-camera";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import { BASE_COLOR, BASE_COLOR_ERROR } from "../config";

class Camera extends Component {
  state = {
    path: null
  };

  renderCamera() {
    return (
      <RNCamera
        ref={camera => {
          this.camera = camera;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        permissionDialogTitle={"Permissão para usar a câmera"}
        permissionDialogMessage={
          "Precisamos de sua permissão para usar a câmera do dispositivo"
        }
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Icon
              name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
              size={32}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>
      </RNCamera>
    );
  }

  renderImage() {
    return (
      <View>
        <ImageBackground
          source={{ uri: this.state.path }}
          style={styles.preview}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => this.setState({ path: null })}
              style={[styles.capture, { backgroundColor: BASE_COLOR_ERROR }]}
            >
              <Icon
                name={Platform.OS === "android" ? "md-close" : "ios-close"}
                size={32}
                color="#FFF"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.uploadPicture}
              style={styles.capture}
            >
              <Icon
                name={
                  Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
                }
                size={32}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      try {
        const options = { quality: 0.5, fixOrientation: true };
        const data = await this.camera.takePictureAsync(options);
        this.setState({ path: data.uri });
      } catch (err) {
        console.log(err);
      }
    }
  };

  uploadPicture = () => {
    const { id, handleUpload, componentId } = this.props;
    handleUpload(this.state.path, id);
    Navigation.dismissModal(componentId);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.path ? this.renderImage() : this.renderCamera()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000"
  },
  buttonContainer: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: BASE_COLOR,
    borderRadius: 100,
    height: 55,
    width: 55,
    margin: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  cancel: {
    position: "absolute",
    right: 15,
    top: 35,
    backgroundColor: "transparent",
    color: "#FFF",
    fontWeight: "600",
    fontSize: 17
  }
});

export default Camera;
