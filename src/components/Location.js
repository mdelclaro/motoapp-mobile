import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert
} from "react-native";
import MapView, { AnimatedRegion } from "react-native-maps";
//import { connect } from "react-redux";

import FindMeButton from "../components/UI/FindMeButton";
//import male from "../assets/male.png";

const polyline = require("@mapbox/polyline");

class PickLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMapReady: false,
      coords: [],
      location: {
        latitude: 37.7900352,
        longitude: -122.4013726,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get("window").width / Dimensions.get("window").height) *
          0.0122
      },
      error: null,
      coordinate: new AnimatedRegion({
        latitude: null,
        longitude: null
      }),
      locationChoosen: false
    };
    this.watchID = null;
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      ).then(granted => {
        if (granted) {
          this.getLocation();
          this.locationChanged();
          this.getDirections();
        }
      });
    } else {
      this.getLocation();
      this.locationChanged();
      this.getDirections();
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  };

  getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState(prevState => {
          return {
            location: {
              ...prevState.location,
              latitude,
              longitude
            },
            coordinate: {
              ...prevState.coordinate,
              latitude,
              longitude
            }
          };
        });
        this.pickLocationHandler(latitude, longitude);
      },
      error => {
        this.setState({ error: error.message });
        Alert.alert(
          "Ops...",
          "Erro ao obter localização! Verifique " +
            "se a localização do celular está ativa e " +
            "tente novamente",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    );
  };

  getDirections = () => {
    const points = polyline.decode(this.props.encodedPolyline);
    const coords = points.map(point => {
      return {
        latitude: parseFloat(point[0]),
        longitude: parseFloat(point[1])
      };
    });
    this.setState({ coords });
    console.log(JSON.stringify(this.state.coords));
  };

  pickLocationHandler = (latitude, longitude) => {
    this.map.animateToRegion({
      ...this.state.location,
      latitude,
      longitude
    });

    this.setState(prevState => {
      return {
        location: {
          ...prevState.location,
          latitude,
          longitude
        },
        locationChosen: true
      };
    });
  };

  locationChanged = () => {
    this.watchID = navigator.geolocation.watchPosition(
      lastPosition => {
        const latitude = parseFloat(
          JSON.stringify(lastPosition.coords.latitude)
        );
        const longitude = parseFloat(
          JSON.stringify(lastPosition.coords.longitude)
        );
        const location = { latitude, longitude };
        this.setState(prevState => {
          return {
            location: {
              ...prevState.location,
              latitude,
              longitude
            }
          };
        });

        this.map.animateToCoordinate(location, 500);

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(location, 500);
          }
        } else {
          this.state.coordinate.timing(location).start();
        }
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, distanceFilter: 1 }
    );
    console.log(JSON.stringify(this.state.location));
  };

  render() {
    // let marker = null;

    // if (this.state.locationChosen) {
    //   marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    // }

    return (
      <View style={styles.container}>
        <MapView
          onLayout={this.onMapLayout}
          style={styles.map}
          loadingEnabled
          initialRegion={this.state.location}
          region={
            !this.state.locationChosen ? this.state.focusedLocation : null
          }
          mapType="satellite"
          showsCompass={false}
          showsScale={false}
          ref={ref => (this.map = ref)}
        >
          {this.state.isMapReady && (
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={3}
              strokeColor="#57bbbc"
            />
          )}
          {this.state.isMapReady && (
            <MapView.Marker.Animated
              ref={ref => (this.marker = ref)}
              coordinate={this.state.coordinate}
              anchor={{ x: 0.5, y: 0.5 }}
              // image={male}
            />
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          <FindMeButton
            onPress={this.getLocation}
            style={styles.button}
            color="transparent"
            iconColor="#425cf4"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  buttonContainer: {
    position: "absolute",
    right: 15,
    bottom: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    // backgroundColor: '#29aaf4',
    borderRadius: 100
  }
});

export default PickLocation;
