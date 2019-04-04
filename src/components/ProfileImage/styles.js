import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { BASE_COLOR } from "../../config";

export const View = styled.View`
  flex: 1;
`;

export const ImageBackground = styled.ImageBackground`
  flex: 1;
  height: ${Dimensions.get("window").height}px;
  width: ${Dimensions.get("window").width}px;
`;

export const Container = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: center;
`;

export const TouchableOpacity = styled.TouchableOpacity`
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
