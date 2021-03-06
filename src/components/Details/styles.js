import styled from "styled-components/native";
import { BASE_COLOR, BASE_COLOR_ERROR, BACKGROUND_COLOR } from "../../config";

export const Container = styled.View`
  background: ${BACKGROUND_COLOR};
  height: 260px;
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
  padding-bottom: 3px;
  text-align: center;
`;

export const Image = styled.Image`
  height: 80px;
  margin: 10px 0;
`;

export const RequestButton = styled.TouchableOpacity`
  background: ${BASE_COLOR};
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
  border-radius: 15;
`;

export const CancelButton = styled.TouchableOpacity`
  background: ${BASE_COLOR_ERROR};
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
  border-radius: 15;
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;
