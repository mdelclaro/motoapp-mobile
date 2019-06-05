import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { BASE_COLOR } from "../../config";

export const View = styled.View`
  flex: 1;
`;

export const ImageBackground = styled.ImageBackground`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
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
  bottom: 15px;
`;
