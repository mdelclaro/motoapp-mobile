import React, { Fragment } from "react";
import { View } from "react-native";
import { Navigation } from "react-native-navigation";

import {
  Container,
  ContentContainer,
  ImageContainer,
  Image,
  MainText,
  SecondaryText,
  Border,
  FooterContainer,
  Footer,
  BackButton
} from "./styles";
import CustomIcon from "../UI/CustomIcon";
import { BASE_COLOR, IMAGES_URL } from "../../config";

const Profile = props => {
  const { nome, sobrenome, email, corridas, imgPerfil } = props;

  return (
    <Fragment>
      <Container>
        <ImageContainer>
          <Border>
            <Image
              source={{ uri: IMAGES_URL + imgPerfil }}
              resizeMode="cover"
            />
          </Border>
        </ImageContainer>

        <ContentContainer>
          <MainText>
            {nome} {sobrenome}
          </MainText>
          <SecondaryText>{email}</SecondaryText>
        </ContentContainer>
        <FooterContainer>
          <View>
            <Footer>
              <CustomIcon icon="map-pin" size={30} color={BASE_COLOR} />
            </Footer>
            <MainText>{corridas.length}</MainText>
            <SecondaryText>Corrida(s)</SecondaryText>
          </View>
          {/* <View>
            <Footer>
              <CustomIcon icon="star" size={30} color={BASE_COLOR} />
            </Footer>
            <MainText>{nota}/5</MainText>
            <SecondaryText>Nota</SecondaryText>
          </View> */}
        </FooterContainer>
      </Container>
      <BackButton onPress={() => Navigation.dismissAllModals()}>
        <CustomIcon icon={"arrow-left"} size={25} color="#f8f8f8" />
      </BackButton>
    </Fragment>
  );
};

export default Profile;
