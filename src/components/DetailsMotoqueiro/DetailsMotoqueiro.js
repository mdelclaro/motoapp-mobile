import React, { Component } from "react";
import { View, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import openSocket from "socket.io-client";
import { socketUrl } from "../../config";

import {
  Container,
  Title,
  Description,
  ActionButton,
  ButtonText
} from "./styles";

import avatar from "../../assets/avatar/avatar.png";

class DetailsMotoqueiro extends Component {
  componentDidMount() {
    const socket = openSocket(socketUrl);
    socket.emit("join", { id: this.props.motoqueiro._id });

    socket.on("locationChanged", data => {
      this.props.handleLocationChanged(data.coords);
    });

    socket.on("reconnect", () => {
      socket.emit("join", { id: this.props.motoqueiro._id });
    });
  }
  render() {
    return (
      <Container>
        <Title>
          {this.props.motoqueiro.nome} {this.props.motoqueiro.sobrenome}
        </Title>
        <Image
          source={avatar}
          style={{
            paddingBottom: 3,
            width: 60,
            height: 60,
            resizeMode: "center",
            borderRadius: 100
          }}
        />
        <Description>
          {this.props.motoqueiro.moto} - {this.props.motoqueiro.placa}
        </Description>
        <Description>R$6,00</Description>
        <Description>
          Tempo estimado: {Math.floor(this.props.motoqueiro.duracao / 60)} min
        </Description>
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            alignContent: "space-between",
            justifyContent: "space-between",
            alignItems: "stretch"
          }}
        >
          <ActionButton>
            <ButtonText>Mensagem</ButtonText>
          </ActionButton>
          <ActionButton>
            <ButtonText>Ligar</ButtonText>
          </ActionButton>
        </View>
      </Container>
    );
  }
}

export default DetailsMotoqueiro;
