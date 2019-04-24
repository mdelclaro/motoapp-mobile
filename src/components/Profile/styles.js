import styled from "styled-components/native";
import { BASE_COLOR } from "../../config";
import FastImage from "react-native-fast-image";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${BASE_COLOR};
`;

export const ImageContainer = styled.View`
  padding-top: 60px;
  padding-bottom: 20px;
  justify-content: flex-start;
  align-content: center;
`;
export const ContentContainer = styled.View`
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

export const Border = styled.View`
  width: 120px;
  height: 120px;
  border: 4px solid;
  border-radius: 100px;
  border-color: #f8f8f8;
  overflow: hidden;
  justify-content: center;
  align-content: center;
`;

export const Image = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 100px;
  resize-mode: center;
  align-self: center;
`;

export const MainText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #f8f8f8;
`;

export const SecondaryText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: #e4e4e4;
`;

export const FooterContainer = styled.View`
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 60px;
  flex-direction: row;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 100px;
  background-color: #f8f8f8;
  margin-left: 5px;
  margin-right: 5px;
`;

export const BackButton = styled.TouchableOpacity`
  flex: 0;
  border-radius: 100px;
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 10px;
  top: 15px;
`;
