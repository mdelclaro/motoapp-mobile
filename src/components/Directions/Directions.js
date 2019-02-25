import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Direction = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyBtJI4iAvzXZw9o5k2Ee9UwgVyR0vX0vPs"
    strokeWidth={3}
    strokeColor="#425cf4"
  />
);

export default Direction;
