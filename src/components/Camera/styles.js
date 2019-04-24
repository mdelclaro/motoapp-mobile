import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { BASE_COLOR, BASE_COLOR_ERROR } from "../../config";
import CameraComponent from "./CameraComponent";

export const StyledCamera = styled(props => <CameraComponent {...props} />)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: ${Dimensions.get("window").height};
  width: ${Dimensions.get("window").width};
`;

export const Preview = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: ${Dimensions.get("window").height};
  width: ${Dimensions.get("window").width};
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #000;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const CaptureButton = styled.TouchableOpacity`
  background-color: ${BASE_COLOR};
  border-radius: 100;
  height: 55px;
  width: 55px;
  margin: 20px;
  align-items: center;
  justify-content: center;
`;

export const SwitchButton = styled.TouchableOpacity`
  flex: 0;
  background-color: ${BASE_COLOR};
  border-radius: 100px;
  height: 55px;
  width: 55px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  top: 15px;
`;

export const CancelButton = styled(CaptureButton)`
  background-color: ${BASE_COLOR_ERROR};
`;

export const BackButton = styled.TouchableOpacity`
  flex: 0;
  background-color: ${BASE_COLOR};
  border-radius: 100px;
  height: 55px;
  width: 55px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 5px;
  top: 15px;
`;
