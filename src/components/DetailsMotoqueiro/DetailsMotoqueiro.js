import React, { Component } from "react";
import { Image, ActivityIndicator } from "react-native";

import { Container, Title, Description } from "./styles";

import flags from "../../assets/flags/flags.png";

class DetailsMotoqueiro extends Component {
  render() {
    return (
      <Container>
        <Title>
          {this.props.motoqueiro.nome} {this.props.motoqueiro.sobrenome}
        </Title>
        <Image
          source={flags}
          style={{
            paddingBottom: 3,
            width: 60,
            height: 60,
            resizeMode: "center",
            borderRadius: 100
          }}
        />
        <Description>Titan Prata</Description>
        <Description>{this.props.motoqueiro.placa}</Description>
        <Description>Tempo estimado: 8 min</Description>
      </Container>
    );
  }
}

export default DetailsMotoqueiro;
