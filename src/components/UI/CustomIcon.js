import React from "react";
import { Platform } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Feather";

export default (CustomIcon = props => {
  const { icon, size, color, style } = props;
  return (
    <Icon
      // name={Platform.OS === "android" ? `md-${icon}` : `ios-${icon}`}
      name={icon}
      size={size}
      color={color}
      style={style}
    />
  );
});
