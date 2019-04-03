import React from "react";
import { View, Dimensions, TouchableOpacity, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { Navigation } from "react-native-navigation";

const Avatar = props => {
  const { componentId, icon, uri } = props;
  Navigation.mergeOptions(componentId, {
    topBar: {
      backButton: {
        icon
      }
    }
  });

  const navigationButtonEventListener = Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId }) => {
      if (buttonId === "imgBackButton") {
        Navigation.pop(componentId);
        navigationButtonEventListener.remove();
      }
    }
  );

  return (
    <View style={{ flex: 1 }}>
      <FastImage
        source={{ uri }}
        style={{
          flex: 1,
          height: Dimensions.get("window").height - 30,
          width: Dimensions.get("window").width
        }}
      />
    </View>
  );
};

export default Avatar;
