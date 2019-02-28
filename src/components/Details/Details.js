import React, { Component } from "react";
import { Image, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import openSocket from "socket.io-client";

import {
  Container,
  Title,
  Description,
  RequestButton,
  CancelButton,
  RequestButtonText
} from "./styles";

import flags from "../../assets/flags/flags.png";

class Details extends Component {
  componentDidMount() {
    const socket = openSocket("http://192.168.2.107:8080");
    socket.emit("join", { id: "123" }); //TODO: colocar idCliente apos auth
    socket.on("acceptCorrida", data => {
      this.props.accept(data.motoqueiro);
    });
  }

  handleRequestOnPress = () => {
    this.props.request();
  };

  handleCancelOnPress = () => {
    this.props.cancel();
  };

  render() {
    const { origem, destino, tempo } = this.props;
    return (
      <Container>
        {this.props.corrida ? (
          <Title>Aguardando motoqueiro...</Title>
        ) : (
          <Title>Pedir corrida</Title>
        )}
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
        <Description>
          De {origem} para {destino}
        </Description>
        <Description>R$6,00</Description>
        <Description>Tempo estimado: {tempo} min</Description>
        {!this.props.corrida ? (
          <RequestButton onPress={this.handleRequestOnPress}>
            {this.props.isLoading ? (
              <ActivityIndicator />
            ) : (
              <RequestButtonText>Chamar Moto</RequestButtonText>
            )}
          </RequestButton>
        ) : (
          <CancelButton onPress={this.handleCancelOnPress}>
            {this.props.isLoading ? (
              <ActivityIndicator />
            ) : (
              <RequestButtonText>Cancelar corrida</RequestButtonText>
            )}
          </CancelButton>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    corrida: state.corrida.corrida
  };
};

export default connect(mapStateToProps)(Details);
