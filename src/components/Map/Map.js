import React, { Component, Fragment } from "react";
import { View, Dimensions, Platform, PermissionsAndroid } from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";
import { Navigation } from "react-native-navigation";
import GeoCoder from "react-native-geocoding";
import { getImageSource } from "react-native-vector-icons/Ionicons";
import geolib from "geolib";

import { connect } from "react-redux";

import { addCorrida, cancelCorrida } from "../../store/actions/index";

import Search from "../Search/Search";
import Directions from "../Directions/Directions";
import Details from "../Details/Details";
import DetailsMotoqueiro from "../DetailsMotoqueiro/DetailsMotoqueiro";
import EnRoute from "../EnRoute/EnRoute";

import { getPixelSize } from "../../utils";

import pin from "../../assets/destination_pin/pin.png";
import user from "../../assets/user/user.png";
import helmet from "../../assets/helmet/helmet.png";

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

GeoCoder.init("AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs");

class Localizacao extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, "Main");
    this.watchID = null;
  }

  state = {
    step: 0, // 0 - escolher destino, 1 - destino escolhido/chamar moto, 2 - motoqueiro aceitou, 3 - em viagem
    region: null, // localizacao atual
    destination: null, // destino
    duration: null, // duracao
    location: null, // nome da rua destino
    distance: null, // distancia origem -> destino
    motoqueiro: false, // objeto com dados do motoqueiro
    clienteLocation: new AnimatedRegion({
      latitude: null,
      longitude: null
    }),
    motoqueiroLocation: new AnimatedRegion({
      latitude: null,
      longitude: null
    })
  };

  resetState = () => {
    this.setState({
      step: 0,
      destination: null, // destino
      duration: null, // duracao
      location: null, // nome da rua destino
      distance: null, // distancia origem -> destino
      motoqueiro: false, // se corrida foi aceita ou nao
      motoqueiroLocation: new AnimatedRegion({
        // localizacao do motoqueiro
        latitude: null,
        longitude: null
      })
    });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

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
            this.locationChanged();
          }
        } else {
          this.getCurrentLocation();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      this.getCurrentLocation();
      this.locationChanged();
    }
  }

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
          },
          clienteLocation: {
            latitude,
            longitude
          }
        });
      },
      err => console.log(err),
      {
        timeout: 5000,
        enableHighAccuracy: true
      }
    );
  };

  // observa mudanca de localizacao
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
            region: {
              ...prevState.region,
              latitude,
              longitude
            },
            clienteLocation: {
              latitude,
              longitude
            }
          };
        });

        if (Platform.OS === "android") {
          if (this.clienteMarker) {
            this.clienteMarker._component.animateMarkerToCoordinate(
              location,
              500
            );
          }
        } else {
          this.state.clienteLocation.timing(location).start();
        }
      },
      err => console.log(err),
      { enableHighAccuracy: true, timeout: 5000 }
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
      },
      step: 1
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

  // pedir corrida
  handleAddCorrida = async () => {
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

    const exec = await this.props.onAddCorrida(
      origem,
      destino,
      distance,
      duration
    );

    if (!exec) return;

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
    const exec = await this.props.onCancelCorrida(idCorrida);

    if (!exec) {
      return;
    }

    this.setState({ step: 1 });

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
      step: 0,
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

  handleAcceptCorrida = async (motoqueiro, coords, duration) => {
    motoqueiro = {
      ...motoqueiro,
      duracao: duration
    };
    const coordinates = {
      latitude: parseFloat(coords.lat),
      longitude: parseFloat(coords.long)
    };
    this.setState(prevState => {
      return {
        step: 2,
        motoqueiro,
        motoqueiroLocation: {
          ...prevState.motoqueiroLocation,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude
        }
      };
    });
    this.handleLocationChanged(coords);
    this.mapView.fitToCoordinates([coordinates, this.state.region], {
      edgePadding: {
        right: getPixelSize(60),
        left: getPixelSize(60),
        top: getPixelSize(60),
        bottom: getPixelSize(260)
      },
      animated: true
    });
  };

  handleLocationChanged = coords => {
    const coordinates = {
      latitude: parseFloat(coords.lat),
      longitude: parseFloat(coords.long)
    };

    if (Platform.OS === "android") {
      this.motoqueiroMarker._component.animateMarkerToCoordinate(
        coordinates,
        500
      );
    } else {
      this.state.motoqueiroLocation.timing(coordinates).start();
    }

    // motoqueiro -> passageiro
    const distance = geolib.getDistance(coordinates, this.state.region, 1);
    // motoqueiro chegou - em viagem agora
    if (distance <= 20) {
      alert("Motoqueiro ja deve estar na sua localizacao");
    }
  };

  handleStartCorrida = () => {
    alert("em viagem!");

    this.setState({
      step: 3
    });
  };

  handleFinishCorrida = () => {
    //avaliar
    alert("chegou ao destino!");

    this.resetState();
  };

  render() {
    const {
      step,
      region,
      destination,
      duration,
      location,
      motoqueiro,
      motoqueiroLocation,
      clienteLocation
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          onMapReady={this.onMapReady}
          style={{ flex: 1 }}
          region={region}
          //showsUserLocation
          loadingEnabled
          showsCompass={false}
          showsMyLocationButton={false}
          showsScale={false}
          ref={el => (this.mapView = el)}
        >
          <Marker.Animated
            anchor={{ x: 0.5, y: 0.5 }}
            coordinate={clienteLocation}
            image={user}
          />
          {step == 1 ? (
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
                    },
                    animated: true
                  });
                }}
              />
              <Marker
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={destination}
                image={pin}
              />
            </Fragment>
          ) : null}
          {step == 2 ? (
            <Marker.Animated
              ref={marker => {
                this.motoqueiroMarker = marker;
              }}
              coordinate={motoqueiroLocation}
              image={helmet}
            />
          ) : null}
        </MapView>

        {step == 0 ? (
          <Search onLocationSelected={this.handleLocationSelected} />
        ) : null}

        {step == 1 ? (
          <Details
            origem={location}
            destino={destination.title}
            tempo={duration}
            request={this.handleAddCorrida}
            cancel={this.handleCancelCorrida}
            accept={this.handleAcceptCorrida}
          />
        ) : null}

        {step == 2 ? (
          <DetailsMotoqueiro
            handleLocationChanged={this.handleLocationChanged}
            handleStartCorrida={this.handleStartCorrida}
            motoqueiro={motoqueiro}
          />
        ) : null}

        {step == 3 ? (
          <EnRoute
            handleFinishCorrida={this.handleFinishCorrida}
            origem={location}
            destino={destination.title}
            motoqueiro={motoqueiro}
          />
        ) : null}
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
