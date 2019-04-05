import React, { Fragment } from "react";
import { RNCamera } from "react-native-camera";
import CustomIcon from "../UI/CustomIcon";
import { Navigation } from "react-native-navigation";

import { ButtonContainer, CaptureButton, BackButton } from "./styles";

export default (CameraComponent = (props, { style }) => {
  const { takePicture, myRef, componentId } = props;
  return (
    <Fragment>
      <RNCamera
        ref={myRef}
        style={style}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        flashMode={RNCamera.Constants.FlashMode.off}
        captureAudio={false}
        permissionDialogTitle={"Permissão para usar a câmera"}
        permissionDialogMessage={
          "Precisamos de sua permissão para usar a câmera do dispositivo"
        }
      >
        <ButtonContainer>
          <CaptureButton onPress={takePicture}>
            <CustomIcon icon={"camera"} size={32} color="#FFF" />
          </CaptureButton>
        </ButtonContainer>
      </RNCamera>
      <BackButton onPress={() => Navigation.dismissAllModals()}>
        <CustomIcon icon={"arrow-back"} size={32} color="#FFF" />
      </BackButton>
    </Fragment>
  );
});
