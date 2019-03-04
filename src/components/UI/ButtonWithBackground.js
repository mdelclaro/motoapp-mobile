import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  //TouchableNativeFeedback,
  StyleSheet,
  Platform
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const buttonWithBackground = props => {
  let buttonColor = null;
  let textColor = props.textColor;
  //let buttonShadow = null;

  if (props.isDisabled) {
    buttonColor = {
      backgroundColor: "#c1c1c1"
    };
  } else {
    buttonColor = {
      backgroundColor: props.color
    };
  }

  // if (props.color) {
  //   buttonShadow = {
  //     shadowColor: '#000',
  //     shadowOffset: { width: 15, height: 15 },
  //     shadowOpacity: 0.4,
  //     shadowRadius: 10,
  //     elevation: 10
  //   };
  // }

  const content = (
    <View style={[styles.button, buttonColor, props.style]}>
      {props.children == null ? (
        <Icon
          name={Platform.OS === "android" ? "md-locate" : "ios-locate"}
          size={30}
          style={styles.icon}
        />
      ) : (
        <Text style={{ color: textColor || "white", textAlign: "center" }}>
          {props.children}
        </Text>
      )}
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
    //margin: 5,
    borderRadius: 10,
    marginTop: 10
    // borderWidth: 1,
    // borderColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexGrow: 1
  },
  icon: {
    justifyContent: "center",
    alignContent: "center",
    color: "#425cf4"
  }
});

export default buttonWithBackground;
