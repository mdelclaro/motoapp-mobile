import React, { Component } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { connect } from "react-redux";
import "moment/locale/pt-br";

import { sendMessage, setChats } from "../../store/actions/";
import { BASE_COLOR, IMAGES_URL } from "../../config";

class Chat extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    const messages = this.props.mensagens.reverse();
    this.setState({
      messages: messages.map(mensagem => {
        return {
          _id: mensagem._id,
          text: mensagem.text,
          createdAt: mensagem.createdAt,
          user: {
            _id: mensagem.sender
          },
          sent: true
        };
      })
    });
  }

  async onSend(messages = []) {
    messages[0].user = {
      _id: this.props.idCliente
    };
    await this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    const exec = await this.props.sendMessage(
      this.props.idMotoqueiro._id,
      this.props.idCliente,
      messages[0].text
    );

    if (exec) {
      let newState = this.state.messages;
      newState = newState.map(message => {
        if (message._id === messages[0]._id) {
          message.sent = true;
        }
        return message;
      });
      this.setState({ messages: newState });
      let chats = this.props.chats.reverse();
      chats[this.props.index].mensagens.push(exec);
      this.props.setChats(chats);
    }
  }

  render() {
    return (
      <GiftedChat
        // inverted={false}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        placeholder="Escrever..."
        locale={"pt-br"}
        user={{
          _id: this.props.idCliente
        }}
        renderSend={props => {
          return (
            <Send
              {...props}
              textStyle={{ color: BASE_COLOR }}
              label={"Enviar"}
            />
          );
        }}
        renderBubble={props => {
          return (
            <Bubble
              {...props}
              textStyle={{
                left: {
                  color: "#FFF"
                }
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: BASE_COLOR
                },
                right: {
                  backgroundColor: "#3544b2"
                }
              }}
            />
          );
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chats.chats
  };
};

const mapDispatchToProps = {
  sendMessage: (idMotoqueiro, idCliente, text) =>
    sendMessage(idMotoqueiro, idCliente, text),
  setChats: chats => setChats(chats)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
