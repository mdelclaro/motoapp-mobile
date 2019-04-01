import React from "react";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_API } from "../../config";

const Direction = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey={GOOGLE_API}
    strokeWidth={4}
    strokeColor="#425cf4"
  />
);

export default Direction;
