import styled, { css } from "styled-components/native";
import { Platform } from "react-native";
import { BACKGROUND_COLOR } from "../../config";

export const LocationBox = styled.View`
  background: ${BACKGROUND_COLOR};
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 10px;
  flex-direction: row;

  ${Platform.select({
    ios: css`
      margin-top: 30px;
    `,
    android: css`
      margin-top: 20px;
      margin-left: 10px;
    `
  })}
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.select({
    ios: 40,
    android: 20
  })};
  left: 20px;
`;
