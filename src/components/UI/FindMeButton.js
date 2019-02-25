import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const findMeButton = props => {
  const buttonColor = {
    backgroundColor: props.color
  };
  const iconColor = {
    color: props.iconColor
  };

  const content = (
    <View style={[styles.button, buttonColor, props.style]}>
      {
        <Icon
          name={Platform.OS === "android" ? "md-locate" : "ios-locate"}
          size={30}
          style={[styles.icon, iconColor]}
        />
      }
    </View>
  );
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.isDisabled}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    color: "#fc6d07"
  }
});

export default findMeButton;
