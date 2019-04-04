import React from "react";
import {
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Navigation } from "react-native-navigation";
import { BASE_COLOR } from "../../config";

const Avatar = props => {
  const { uri, componentId } = props;

  handleBack = () => {
    Navigation.dismissModal(componentId);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={uri} style={styles.image}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.handleBack} style={styles.button}>
            <Icon
              name={
                Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back"
              }
              size={30}
              color="#f8f8f8"
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width
  },
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center"
  },
  button: {
    flex: 0,
    backgroundColor: BASE_COLOR,
    borderRadius: 100,
    height: 55,
    width: 55,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 5,
    top: 15
  }
});

export default Avatar;
