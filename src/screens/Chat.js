import React, { Component, Fragment } from "react";
import { Appbar } from "react-native-paper";
import {
  GiftedChat,
  Bubble,
  Send,
  LoadEarlier
} from "react-native-gifted-chat";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import openSocket from "socket.io-client";
import "moment/locale/pt-br";

import { sendMessage, setChats, getChats } from "../store/actions";
import { BASE_COLOR, IMAGES_URL, SOCKET_URL } from "../config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      page: 0,
      skip: 0,
      refresh: { refresh: true },
      isLoadingEarlier: false,
      loadEarlier:
        this.props.chats[this.props.index].count > this.props.mensagens.length
          ? true
          : false
    };
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.socket;
  }

  componentDidMount() {
    this.setState({
      messages: this.props.chats[this.props.index].mensagens.map(mensagem => {
        return {
          _id: mensagem._id,
          text: mensagem.text,
          createdAt: mensagem.createdAt,
          user: {
            _id: mensagem.sender,
            avatar:
              mensagem.sender === this.props.idMotoqueiro._id
                ? IMAGES_URL + this.props.idMotoqueiro
                : null
          },
          sent: true
        };
      })
    });
    this.socket = openSocket(SOCKET_URL);
    this.socket.emit("join", { id: this.props.idCliente });

    this.socket.on("msgFromDriver", async data => {
      console.log(data.mensagem);
      const stateMessage = {
        _id: data.mensagem._id,
        text: data.mensagem.text,
        createdAt: data.mensagem.createdAt,
        user: {
          _id: data.mensagem.sender,
          avatar: IMAGES_URL + this.props.idMotoqueiro
        },
        sent: true
      };
      await this.setState(previousState => ({
        skip: previousState.skip + 1,
        messages: GiftedChat.append(previousState.messages, stateMessage)
      }));

      let chats = this.props.chats.slice();
      chats[this.props.index].mensagens.unshift(data.mensagem);
      this.props.setChats(chats);
    });

    this.socket.on("reconnect", () => {
      this.socket.emit("join", { id: this.props.idCliente });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
      this.props.userId,
      messages[0].text
    );

    let newState = this.state.messages;
    if (exec) {
      newState = newState.map(message => {
        if (message._id === messages[0]._id) {
          message.sent = true;
        }
        return message;
      });
    } else {
      newState = newState.map(message => {
        if (message._id === messages[0]._id) {
          message.error = true;
        }
        return message;
      });
    }

    this.setState(previousState => {
      return {
        skip: previousState.skip + 1,
        messages: newState
      };
    });

    let chats = this.props.chats.slice();
    chats[this.props.index].mensagens.unshift(exec);
    this.props.setChats(chats);
  }

  async onLoadEarlier() {
    if (this.state.loadEarlier) {
      await this.setState(previousState => {
        return {
          page: previousState.page + 1,
          isLoadingEarlier: true,
          refresh: { refresh: !previousState.refresh.refresh }
        };
      });

      let newMessages = await this.props.getChats(
        this.props.userId,
        this.state.page,
        this.state.skip,
        false
      );
      newMessages = newMessages[this.props.index].mensagens.map(mensagem => {
        return {
          _id: mensagem._id,
          text: mensagem.text,
          createdAt: mensagem.createdAt,
          user: {
            _id: mensagem.sender,
            avatar:
              mensagem.sender === this.props.idMotoqueiro._id
                ? IMAGES_URL + this.props.idMotoqueiro
                : null
          },
          sent: true
        };
      });

      await this.setState(previousState => {
        return {
          messages: GiftedChat.prepend(previousState.messages, newMessages),
          isLoadingEarlier: false,
          refresh: { refresh: !previousState.refresh.refresh }
        };
      });
      if (
        this.state.messages.length >= this.props.chats[this.props.index].count
      )
        this.setState(previousState => {
          return {
            loadEarlier: false,
            refresh: { refresh: !previousState.refresh.refresh }
          };
        });
    }
  }

  goBack = () => {
    Navigation.dismissModal("chat");
  };

  render() {
    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title={this.props.idMotoqueiro.nome} />
        </Appbar.Header>
        <GiftedChat
          removeClippedSubviews={true}
          extraData={this.state.refresh}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          placeholder="Escrever..."
          locale={"pt-br"}
          minInputToolbarHeight={55}
          loadEarlier={this.state.loadEarlier}
          user={{
            _id: this.props.idCliente
          }}
          renderLoadEarlier={props => {
            return this.state.loadEarlier ? (
              <LoadEarlier
                {...props}
                label={"Carregar mais"}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
              />
            ) : null;
          }}
          renderSend={props => {
            return (
              <Send
                {...props}
                disabled={this.props.loading}
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
                    backgroundColor: "#4e4e4f"
                  },
                  right: {
                    // backgroundColor: !props.currentMessage.error
                    //   ? "#3544b2"
                    //   : "red"
                    backgroundColor: "#3544b2"
                  }
                }}
              />
            );
          }}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    chats: state.chats.chats,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  sendMessage: (idMotoqueiro, idCliente, text) =>
    sendMessage(idMotoqueiro, idCliente, text),
  setChats: chats => setChats(chats),
  getChats: (idCliente, page, skip, shouldSet) =>
    getChats(idCliente, page, skip, shouldSet)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
