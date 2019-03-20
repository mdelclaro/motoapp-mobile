import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { googleApi } from "../../config";

const Direction = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={googleApi}
    strokeWidth={4}
    strokeColor="#425cf4"
  />
);

export default Direction;
