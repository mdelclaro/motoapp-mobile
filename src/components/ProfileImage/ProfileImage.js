import React from "react";
import { Navigation } from "react-native-navigation";

import CustomIcon from "../UI/CustomIcon";

import { View, Container, ImageBackground, TouchableOpacity } from "./styles";

const ProfileImage = props => {
  const { uri, componentId } = props;

  handleBack = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <View>
      <ImageBackground source={uri}>
        <Container>
          <TouchableOpacity onPress={this.handleBack}>
            {/* <CustomIcon icon={"arrow-back"} size={30} color="#f8f8f8" /> */}
            <CustomIcon icon={"arrow-left"} size={30} color="#f8f8f8" />
          </TouchableOpacity>
        </Container>
      </ImageBackground>
    </View>
  );
};

export default ProfileImage;
