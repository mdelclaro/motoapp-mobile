import React from "react";
import Icon from "react-native-vector-icons/Feather";

export default (CustomIcon = props => {
  const { icon, size, color, style } = props;
  return <Icon name={icon} size={size} color={color} style={style} />;
});
