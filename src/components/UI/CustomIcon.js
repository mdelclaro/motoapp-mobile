import React from "react";
import { Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default (CustomIcon = props => {
  const { icon, size, color } = props;
  return (
    <Icon
      name={Platform.OS === "android" ? `md-${icon}` : `ios-${icon}`}
      size={size}
      color={color}
    />
  );
});
