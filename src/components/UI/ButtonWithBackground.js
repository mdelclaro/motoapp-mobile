import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BASE_COLOR } from "../../config";

const ButtonWithBackground = props => {
  const { textColor } = props;

  const buttonColor = {
    backgroundColor: props.isDisabled ? "#c1c1c1" : props.color
  };

  const content = (
    <View style={[styles.button, buttonColor, props.style]}>
      <Text style={{ color: textColor || "white", textAlign: "center" }}>
        {props.children}
      </Text>
    </View>
  );
  return (
    <TouchableOpacity
      ref={props.myRef}
      onPress={props.onPress}
      disabled={props.isDisabled}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    margin: 10
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    // color: "#425cf4"
    color: BASE_COLOR
  }
});

export default ButtonWithBackground;
