import React, { Component } from "react";
import { Container, Title, Description, Image } from "./styles";
import openSocket from "socket.io-client";
import { SOCKET_URL } from "../../config";

import avatar from "../../assets/avatar/avatar.png";

class EnRoute extends Component {
  componentDidMount() {
    const { _id } = this.props.motoqueiro;
    const socket = openSocket(SOCKET_URL);
    socket.emit("join", { id: _id });

    socket.on("finishCorrida", () => {
      this.props.handleFinishCorrida();
      socket.close();
    });

    socket.on("reconnect", () => {
      socket.emit("join", { id: _id });
    });
  }

  render() {
    const { origem, destino, motoqueiro } = this.props;
    return (
      <Container>
        <Title>Em viagem com</Title>
        <Description>
          {motoqueiro.nome} {motoqueiro.sobrenome}
        </Description>
        <Image source={avatar} />
        <Description>
          De {origem} para {destino}
        </Description>
        <Description>R$6,00</Description>
        <Description />
      </Container>
    );
  }
}

export default EnRoute;
