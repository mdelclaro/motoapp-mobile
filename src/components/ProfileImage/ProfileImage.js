import React from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";

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
            <Icon
              name={
                Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
              }
              size={30}
              color="#f8f8f8"
            />
          </TouchableOpacity>
        </Container>
      </ImageBackground>
    </View>
  );
};

export default ProfileImage;
