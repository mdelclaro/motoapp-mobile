import React from "react";
import CustomIcon from "../UI/CustomIcon";

import {
  ButtonContainer,
  CaptureButton,
  CancelButton,
  Preview
} from "./styles";

export default (PhotoPreview = props => {
  const { uri, handleCancel, handleUpload } = props;
  return (
    <Preview source={{ uri }}>
      <ButtonContainer>
        <CancelButton onPress={handleCancel}>
          {/* <CustomIcon icon={"close"} size={32} color="#FFF" /> */}
          <CustomIcon icon={"x"} size={32} color="#FFF" />
        </CancelButton>

        <CaptureButton onPress={handleUpload}>
          {/* <CustomIcon icon={"checkmark"} size={32} color="#FFF" /> */}
          <CustomIcon icon={"check"} size={32} color="#FFF" />
        </CaptureButton>
      </ButtonContainer>
    </Preview>
  );
});
