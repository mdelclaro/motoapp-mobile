import React, { Component, Fragment } from "react";
import { View, Dimensions, Platform, PermissionsAndroid } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Navigation } from "react-native-navigation";
import GeoCoder from "react-native-geocoding";
import { getImageSource } from "react-native-vector-icons/Ionicons";

import { connect } from "react-redux";

import { addCorrida, cancelCorrida } from "../../store/actions/index";

import Search from "../Search/Search";
import Directions from "../Directions/Directions";
import Details from "../Details/Details";

import { getPixelSize } from "../../utils";

import pin from "../../assets/destination_pin/pin.png";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

GeoCoder.init("AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs");

class Localizacao extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, "Main");
  }

  state = {
    region: null, // localizacao atual
    destination: null, // destino
    duration: null, // duracao
    location: null, // nome da rua destino
    distance: null
  };

  // pedir permissao de localizacao
  async componentDidMount() {
    if (Platform.OS === "android") {
      try {
        // Checa se ja deu permissao
        const isGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        // se nao
        if (!isGranted) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.getCurrentLocation();
            // this.handleLocationChanged();
          }
        } else {
          this.getCurrentLocation();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.getCurrentLocation();
      // this.handleLocationChanged();
    }
  }

  // pega localizacao atual
  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        const response = await GeoCoder.from({ latitude, longitude });
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0122,
            longitudeDelta:
              (Dimensions.get("window").width /
                Dimensions.get("window").height) *
              0.0122
          }
          // coordinate: {
          //   latitude,
          //   longitude
          // }
        });
      }, // sucesso,
      err => {
        console.log(err);
      }, // erro
      {
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  // destino escolhido
  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });

    getImageSource(
      Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      35,
      "#425cf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              visible: false
            }
          ],
          leftButtons: [
            {
              id: "backButton",
              icon
            }
          ]
        }
      });
    });
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "backButton") {
      Navigation.mergeOptions("Main", {
        topBar: {
          leftButtons: []
        }
      });
      this.handleBack();
    }
  }

  // pedir corrida
  handleAddCorrida = () => {
    const { region, destination, duration, location, distance } = this.state;

    const origem = {
      lat: region.latitude,
      long: region.longitude,
      local: location
    };
    const destino = {
      lat: destination.latitude,
      long: destination.longitude,
      local: destination.title
    };

    this.props.onAddCorrida(origem, destino, distance, duration);

    // tirar botao de voltar, e colocar menu
    getImageSource(
      Platform.OS === "android" ? "md-menu" : "ios-menu",
      30,
      "#425cf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ],
          leftButtons: []
        }
      });
    });
  };

  // cancelar corrida
  handleCancelCorrida = async () => {
    const idCorrida = this.props.corrida._id;
    await this.props.onCancelCorrida(idCorrida);

    getImageSource(
      Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      35,
      "#425cf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              visible: false
            }
          ],
          leftButtons: [
            {
              id: "backButton",
              icon
            }
          ]
        }
      });
    });
  };

  // cancelar destino
  handleBack = () => {
    this.setState({
      destination: null
    });

    // voltar botao de menu e esconder botao de voltar
    getImageSource(
      Platform.OS === "android" ? "md-menu" : "ios-menu",
      30,
      "#425cf4"
    ).then(icon => {
      Navigation.mergeOptions("Main", {
        topBar: {
          rightButtons: [
            {
              id: "menuButton",
              icon
            }
          ]
        }
      });
    });
  };

  render() {
    const { region, destination, duration, location } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {/* mapa */}
        <MapView
          onMapReady={this.onMapReady}
          style={{ flex: 1 }}
          region={region}
          showsUserLocation
          loadingEnabled
          showsCompass={false}
          showsMyLocationButton={false}
          showsScale={false}
          ref={el => (this.mapView = el)}
        >
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={result => {
                  this.setState({
                    duration: Math.floor(result.duration),
                    distance: Math.floor(result.distance)
                  });
                  this.mapView.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(60),
                      left: getPixelSize(60),
                      top: getPixelSize(60),
                      bottom: getPixelSize(260)
                    }
                  });
                }}
              />
              <Marker
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={destination}
                image={pin}
              />
            </Fragment>
          )}
        </MapView>

        {destination ? (
          <Details
            origem={location}
            destino={destination.title}
            tempo={duration}
            request={this.handleAddCorrida}
            cancel={this.handleCancelCorrida}
          />
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    corrida: state.corrida.corrida
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddCorrida: (origem, destino, distancia, tempo) =>
      dispatch(addCorrida(origem, destino, distancia, tempo)),
    onCancelCorrida: id => dispatch(cancelCorrida(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localizacao);
