import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import CustomIcon from "../UI/CustomIcon";
import { BASE_COLOR, BASE_COLOR_ERROR, BACKGROUND_COLOR } from "../../config";

const MenuItem = props => {
  const { icon, text, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.drawerItem}>
        <CustomIcon
          icon={icon}
          size={30}
          color={text === "Sair" ? BASE_COLOR_ERROR : BASE_COLOR}
          style={styles.drawerItemIcon}
        />
        <Text>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: BACKGROUND_COLOR,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default MenuItem;
