import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Dimensions,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { Overlay, AirbnbRating } from "react-native-elements";
import avatar from "../../assets/avatar/avatar.png";

class MyRating extends Component {
  state = { rate: 0 };

  handleOnFinishRating = value => {
    this.setState({ rate: value });
  };

  submit = () => {
    this.props.handleRating(this.state.rate);
  };

  render() {
    return (
      <Overlay
        isVisible
        width={Dimensions.get("window").width * 0.7}
        height={Dimensions.get("window").height * 0.3}
        containerStyle={{
          justifyContent: "center"
        }}
      >
        <View style={styles.container}>
          <Text style={styles.text}>Avalie o seu motoqueiro!</Text>
          <Image
            source={avatar}
            style={{
              alignSelf: "center",
              paddingBottom: 3,
              width: 60,
              height: 60,
              resizeMode: "center",
              borderRadius: 100
            }}
          />
          {/* <Rating
            // reviews={["Ruim", "Razoável", "Bom", "Muito bom", "Ótimo"]}
            type="custom"
            ratingColor="#FFF400"
            fractions={0}
            imageSize={25}
            startingValue={3}
            onFinishRating={this.handleOnFinishRating}
            // type={"rocket"}
          /> */}
          <AirbnbRating
            showRating={false}
            reviews={["Ruim", "Razoável", "Bom", "Muito bom", "Ótimo"]}
            ratingColor="#FFF400"
            size={23}
            onFinishRating={this.handleOnFinishRating}
          />
          <TouchableOpacity onPress={this.submit} style={styles.button}>
            {this.props.isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.buttonText}>Avaliar</Text>
            )}
          </TouchableOpacity>
        </View>
      </Overlay>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#425cf4",
    justifyContent: "center",
    alignItems: "center",
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },
  text: {
    fontSize: 22,
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};
export default connect(mapStateToProps)(MyRating);
