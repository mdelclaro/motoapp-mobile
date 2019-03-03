import React, { Component } from "react";
import { Platform } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

class Search extends Component {
  state = {
    searchFocused: false
  };

  render() {
    const { onLocationSelected } = this.props;
    const { searchFocused } = this.state;
    return (
      <GooglePlacesAutocomplete
        placeholder="Para onde?"
        placeholderTextColor="#333"
        onPress={onLocationSelected}
        query={{
          key: "AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs",
          language: "pt"
        }}
        textInputProps={{
          autoCapitalize: "none",
          autoCorrect: false,
          onFocus: () => {
            this.setState({ searchFocused: true });
          },
          onBlur: () => {
            this.setState({ searchFocused: false });
          }
        }}
        listViewDisplayed={searchFocused}
        fetchDetails
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: "absolute",
            top: Platform.select({ ios: 70, android: 50 }),
            width: "100%"
          },
          textInputContainer: {
            // flex: 1,
            backgroundColor: "transparent",
            height: 54,
            marginHorizontal: 20,
            borderTopWidth: 0,
            borderBottomWidth: 0
          },
          textInput: {
            height: 54,
            margin: 0,
            borderRadius: 20,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            // elevation: 5,
            // shadowColor: "#000",
            // shadowOffset: { x: 0, y: 0 },
            // shadowRadius: 10,
            borderWidth: 1,
            borderColor: "#DDD",
            fontSize: 18
          },
          listView: {
            borderWidth: 1,
            borderColor: "#DDD",
            borderRadius: 20,
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            // elevation: 5,
            // shadowColor: "#000",
            // shadowOffset: { x: 0, y: 0 },
            // shadowRadius: 10,
            marginTop: 10
          },
          description: {
            fontSize: 16
          },
          row: {
            padding: 20,
            height: 58
          }
        }}
      />
    );
  }
}

export default Search;