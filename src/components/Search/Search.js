import React, { Component } from "react";
import { Platform, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API, BASE_COLOR } from "../../config";

import CustomIcon from "../UI/CustomIcon";

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
        placeholderTextColor="#CCC"
        onPress={onLocationSelected}
        listViewDisplayed={searchFocused}
        fetchDetails
        loaderRight={true}
        enablePoweredByContainer={false}
        numberOfLines={2}
        query={{
          key: GOOGLE_API,
          language: "pt",
          region: "BR"
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
        renderRow={row => {
          let text = row.terms[0].value;
          let text2 = row.terms[1] ? row.terms[1].value : text;
          text2 += row.terms[2] ? ` - ${row.terms[2].value}` : "";
          return (
            <Text>
              <CustomIcon icon="map-pin" size={15} color={BASE_COLOR} />
              <Text style={{ fontSize: 16 }}>{` ${text}\n`}</Text>
              <Text style={{ color: "#b7b7b7" }}>{`${text2}`}</Text>
            </Text>
          );
        }}
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
            borderRadius: 15,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20,
            paddingRight: 20,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            elevation: 1,
            shadowColor: "#000",
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 3,
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
            elevation: 1,
            shadowColor: "#000",
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 3,
            marginTop: 10
          },
          description: {
            // textAlign: "center",
            fontSize: 14
          },
          row: {
            padding: 10,
            height: 60
            // justifyContent: "center",
            // alignContent: "center"
          },
          loader: {
            justifyContent: "center",
            alignContent: "center",
            height: "100%"
          },
          activityIndicator: {
            size: "large",
            color: BASE_COLOR
          }
        }}
      />
    );
  }
}

export default Search;
