import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import { BASE_COLOR, BASE_COLOR_ERROR } from "../../config";

const MenuItem = props => {
  const { icon, text, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.drawerItem}>
        <Icon
          name={Platform.OS === "android" ? `md-${icon}` : `ios-${icon}`}
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
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e4e4"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default MenuItem;
