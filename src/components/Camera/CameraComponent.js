import React, { Fragment } from "react";
import { RNCamera } from "react-native-camera";
import CustomIcon from "../UI/CustomIcon";
import { Navigation } from "react-native-navigation";

import {
  ButtonContainer,
  CaptureButton,
  BackButton,
  SwitchButton
} from "./styles";

export default (CameraComponent = (props, { style }) => {
  const { takePicture, myRef, switchCamera, cameraType } = props;
  return (
    <Fragment>
      <RNCamera
        ref={myRef}
        style={style}
        type={RNCamera.Constants.Type[cameraType]}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: "Permissão para usar a câmera",
          message:
            "Precisamos de sua permissão para usar a câmera do dispositivo",
          buttonPositive: "Ok",
          buttonNegative: "Cancelar"
        }}
      >
        <ButtonContainer>
          <CaptureButton onPress={takePicture}>
            <CustomIcon icon={"camera"} size={32} color="#FFF" />
          </CaptureButton>
        </ButtonContainer>
      </RNCamera>
      <SwitchButton onPress={switchCamera}>
        <CustomIcon icon={"refresh-ccw"} size={30} color="#FFF" />
      </SwitchButton>
      <BackButton onPress={() => Navigation.dismissAllModals()}>
        <CustomIcon icon={"arrow-left"} size={30} color="#FFF" />
      </BackButton>
    </Fragment>
  );
});
