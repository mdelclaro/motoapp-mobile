import styled from "styled-components/native";
import { BASE_COLOR } from "../../config";
import FastImage from "react-native-fast-image";

export const Container = styled.View`
  flex: 0;
  justify-content: center;
`;
export const Image = styled.Image`
  align-self: center;
  padding-bottom: 15px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-width: 4px;
  border-color: ${BASE_COLOR};
`;

export const FastImageComponent = styled(FastImage)`
  align-self: center;
  padding-bottom: 15px;
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-width: 4px;
  border-color: ${BASE_COLOR};
`;

export const ImageContainer = styled.View`
  flex: 0;
  flex-direction: row;
  justify-content: center;
`;

export const ImageIcon = styled.TouchableOpacity`
  background-color: #e4e4e4;
  flex: 0;
  border-radius: 100px;
  height: 30px;
  width: 30px;
  margin: 20px;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 50px;
  bottom: -10px;
`;
