import styled from "styled-components/native";
import { BASE_COLOR, BACKGROUND_COLOR } from "../../config";

export const Container = styled.View`
  justify-content: space-around;
  background: ${BACKGROUND_COLOR};
  height: 240px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
  border-top-left-radius: 15;
  border-top-right-radius: 15;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #222;
  padding-bottom: 3px;
`;

export const Description = styled.Text`
  color: #666;
  font-size: 14px;
  padding-top: 3px;
`;

export const Image = styled.Image`
  height: 80px;
  margin: 10px 0;
`;

export const ActionButton = styled.TouchableOpacity`
  flex: 2;
  background: ${BASE_COLOR};
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;
