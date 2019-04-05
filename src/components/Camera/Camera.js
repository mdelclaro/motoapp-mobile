import React, { Component } from "react";
import { Navigation } from "react-native-navigation";

import { StyledCamera, Container } from "./styles";
import PhotoPreview from "./PhotoPreview";

class Camera extends Component {
  state = {
    path: null
  };

  handleCancel = () => {
    this.setState({ path: null });
  };

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
      <Container>
        {this.state.path ? (
          <PhotoPreview
            uri={this.state.path}
            handleCancel={this.handleCancel}
            handleUpload={this.uploadPicture}
          />
        ) : (
          <StyledCamera
            myRef={ref => (this.camera = ref)}
            takePicture={this.takePicture}
          />
        )}
      </Container>
    );
  }
}

export default Camera;
