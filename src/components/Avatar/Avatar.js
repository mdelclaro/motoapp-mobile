import React, { Fragment } from "react";
import { TouchableOpacity, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import {
  Container,
  Image,
  ImageContainer,
  ImageIcon,
  FastImageComponent
} from "./styles";

import { IMAGES_URL } from "../../config";

const Avatar = props => {
  const { renderAvatar, renderCamera, componentType, uri, style } = props;
  let imageComponent = null;
  if (componentType === 1) {
    imageComponent = <FastImageComponent source={uri} fallback style={style} />;
  } else {
    imageComponent = <Image source={uri} />;
  }
  return (
    <Container>
      <Fragment>
        <TouchableOpacity onPress={() => renderAvatar(uri)}>
          {imageComponent}
        </TouchableOpacity>
        <ImageContainer>
          <ImageIcon onPress={renderCamera}>
            <Icon
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={25}
              color="#4e4e4f"
            />
          </ImageIcon>
        </ImageContainer>
      </Fragment>
    </Container>
  );
};

export default Avatar;
