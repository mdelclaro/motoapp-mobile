import styled from "styled-components";

export const Container = styled.View`
  flex-direction: column;
  justify-content: space-around;
  background: #fff;
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
