import React, { Component, Fragment } from 'react';
import {
  View,
  Dimensions,
  Platform,
  PermissionsAndroid,
  ActivityIndicator
} from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import { Navigation } from 'react-native-navigation';
import GeoCoder from 'react-native-geocoding';
import { getImageSource } from 'react-native-vector-icons/Feather';
import geolib from 'geolib';

import { connect } from 'react-redux';

import {
  addCorrida,
  cancelCorrida,
  addRating
} from '../../store/actions/index';

import Search from '../Search/Search';
import Directions from '../Directions/Directions';
import Details from '../Details/Details';
import DetailsMotoqueiro from '../DetailsMotoqueiro/DetailsMotoqueiro';
import EnRoute from '../EnRoute/EnRoute';
import Rating from '../Rating/Rating';

import { getPixelSize } from '../../utils';
import { GOOGLE_API, BASE_COLOR } from '../../config';

import pin from '../../assets/destination_pin/pin.png';
import user from '../../assets/user/user.png';
import helmet from '../../assets/helmet/helmet.png';

// const width = Dimensions.get("window").width;
// const height = Dimensions.get("window").height;

GeoCoder.init(GOOGLE_API);

class Localizacao extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this, 'Main');
    this.watchID = null;
  }

  state = {
    isLoading: true,
    step: 0, // 0 - escolher destino, 1 - destino escolhido/chamar moto, 2 - motoqueiro aceitou, 3 - em viagem
    // localizacao atual,
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    },
    destination: null, // destino
    duration: null, // duracao
    location: null, // nome da rua destino
    distance: null, // distancia origem -> destino
    motoqueiro: null, // objeto com dados do motoqueiro
    clienteLocation: new AnimatedRegion({
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    }),
    motoqueiroLocation: new AnimatedRegion({
      latitude: null,
      longitude: null,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width / Dimensions.get('window').height) *
        0.0122
    }),
    showRate: false
  };

  resetState = () => {
    this.setState({
      step: 0, // 0 - escolher destino, 1 - destino escolhido/chamar moto, 2 - motoqueiro aceitou, 3 - em viagem
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      }, // localizacao atual
      destination: null, // destino
      duration: null, // duracao
      location: null, // nome da rua destino
      distance: null, // distancia origem -> destino
      clienteLocation: new AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      }),
      motoqueiroLocation: new AnimatedRegion({
        latitude: null,
        longitude: null,
        latitudeDelta: 0.0122,
        longitudeDelta:
          (Dimensions.get('window').width / Dimensions.get('window').height) *
          0.0122
      }),
      showRate: false
    });
  };

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  // pedir permissao de localizacao
  async componentDidMount() {
    if (Platform.OS === 'android') {
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
          this.locationChanged();
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
    if (buttonId === 'backButton') {
      Navigation.mergeOptions('Main', {
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
        let location;
        try {
          const response = await GeoCoder.from({ latitude, longitude });
          const address = response.results[0].formatted_address;
          location = address.substring(0, address.indexOf(','));
        } catch (err) {
          console.log(err);
        }
        if (!location || location === 'Unnamed Road') {
          location = 'Localização desconhecida';
          alert('Localização desconhecida');
        }
        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0122,
            longitudeDelta:
              (Dimensions.get('window').width /
                Dimensions.get('window').height) *
              0.0122
          },
          clienteLocation: {
            latitude,
            longitude
          },
          isLoading: false
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
      async lastPosition => {
        const latitude = parseFloat(
          JSON.stringify(lastPosition.coords.latitude)
        );
        const longitude = parseFloat(
          JSON.stringify(lastPosition.coords.longitude)
        );
        const location = { latitude, longitude };
        let address;
        try {
          const response = await GeoCoder.from({ latitude, longitude });
          address = response.results[0].formatted_address;
          address = address.substring(0, address.indexOf(','));
        } catch (err) {
          console.log(err);
        }

        if (!address || address === 'Unnamed Road') {
          address = 'Localização desconhecida';
        }

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
            },
            location: address
          };
        });

        if (Platform.OS === 'android') {
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
      { enableHighAccuracy: true, timeout: 5000, distanceFilter: 3 }
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
      // Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      'arrow-left',
      35,
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions('Main', {
        topBar: {
          rightButtons: [
            {
              visible: false
            }
          ],
          leftButtons: [
            {
              id: 'backButton',
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

    const exec = await this.props.addCorrida(
      origem,
      destino,
      distance,
      duration
    );

    if (!exec) return;

    // tirar botao de voltar, e colocar menu
    getImageSource(
      // Platform.OS === "android" ? "md-menu" : "ios-menu",
      'menu',
      30,
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions('Main', {
        topBar: {
          rightButtons: [
            {
              id: 'menuButton',
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
    const exec = await this.props.cancelCorrida(idCorrida);

    if (!exec) return;

    this.setState({ step: 1 });

    getImageSource(
      // Platform.OS === "android" ? "md-arrow-back" : "ios-arrow-back",
      'arrow-left',
      35,
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions('Main', {
        topBar: {
          rightButtons: [
            {
              visible: false
            }
          ],
          leftButtons: [
            {
              id: 'backButton',
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
      // Platform.OS === "android" ? "md-menu" : "ios-menu",
      'menu',
      30,
      BASE_COLOR
    ).then(icon => {
      Navigation.mergeOptions('Main', {
        topBar: {
          rightButtons: [
            {
              id: 'menuButton',
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

    if (Platform.OS === 'android') {
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
      alert('Motoqueiro ja deve estar na sua localizacao');
    }
  };

  handleStartCorrida = () => {
    alert('em viagem!');

    this.setState({
      step: 3
    });
  };

  handleFinishCorrida = () => {
    this.resetState();
    this.setState({ showRate: true });
  };

  submitRating = async rate => {
    const exec = await this.props.addRating(this.state.motoqueiro._id, rate);

    if (!exec) return;

    this.setState({ motoqueiro: null, showRate: false });
  };

  renderMarkers() {
    if (this.props.motoqueiros) {
      if (Object.keys(this.props.motoqueiros).length > 0) {
        return this.props.motoqueiros.map(motoqueiro => {
          return (
            <Marker.Animated
              coordinate={{
                latitude: motoqueiro.coords.lat,
                longitude: motoqueiro.coords.long
              }}
              image={helmet}
              key={motoqueiro.userId}
            />
          );
        });
      }
    }
  }

  render() {
    const {
      step,
      region,
      destination,
      duration,
      location,
      motoqueiro,
      motoqueiroLocation,
      clienteLocation,
      showRate
    } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {showRate && <Rating handleRating={this.submitRating} />}
        {this.state.isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={BASE_COLOR} />
          </View>
        ) : (
          <MapView
            style={{ flex: 1 }}
            region={region}
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
              ref={el => (this.clienteMarker = el)}
            />
            {this.renderMarkers()}
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
        )}
        {step == 0
          ? this.state.location !== 'Localização desconhecida' && (
              <Search onLocationSelected={this.handleLocationSelected} />
            )
          : null}

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

const mapDispatchToProps = {
  addCorrida: (origem, destino, distancia, tempo) =>
    addCorrida(origem, destino, distancia, tempo),
  cancelCorrida: id => cancelCorrida(id),
  addRating: (idMotoqueiro, comentario, nota) =>
    addRating(idMotoqueiro, comentario, nota)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Localizacao);
