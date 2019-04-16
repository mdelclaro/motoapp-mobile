import React, { Component } from "react";
import {
  GiftedChat,
  Bubble,
  Send,
  LoadEarlier
} from "react-native-gifted-chat";
import { connect } from "react-redux";
import "moment/locale/pt-br";

import { sendMessage, setChats, getChats } from "../../store/actions/";
import { BASE_COLOR, IMAGES_URL } from "../../config";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      page: 0,
      isLoadingEarlier: false,
      loadEarlier:
        this.props.chats[this.props.index].count > this.props.mensagens.length
          ? true
          : false
    };
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
  }

  componentWillMount() {
    // const messages = this.props.mensagens.reverse();
    this.setState({
      messages: this.props.mensagens.map(mensagem => {
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
    this.setState({ messages: newState });
    let chats = this.props.chats.reverse();
    chats[this.props.index].mensagens.push(exec);
    this.props.setChats(chats);
  }

  async onLoadEarlier() {
    if (this.state.loadEarlier) {
      await this.setState({
        isLoadingEarlier: true,
        page: this.state.page + 1
      });

      console.log(this.state);

      let newMessages = await this.props.getChats(
        this.props.idCliente,
        this.state.page
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
          // loadEarlier: false,
          isLoadingEarlier: false
        };
      });
      console.log(this.props.chats[this.props.index].count);
      if (
        this.state.messages.length >= this.props.chats[this.props.index].count
      )
        this.setState({ loadEarlier: false });
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
        minInputToolbarHeight={55}
        loadEarlier={this.state.loadEarlier}
        user={{
          _id: this.props.idCliente
        }}
        renderLoadEarlier={props => {
          return (
            this.state.loadEarlier && (
              <LoadEarlier
                {...props}
                label={"Carregar mais"}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.state.isLoadingEarlier}
              />
            )
          );
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
                  backgroundColor: BASE_COLOR
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
    );
  }
}

const mapStateToProps = state => {
  return {
    chats: state.chats.chats,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  sendMessage: (idMotoqueiro, idCliente, text) =>
    sendMessage(idMotoqueiro, idCliente, text),
  setChats: chats => setChats(chats),
  getChats: (idCliente, page) => getChats(idCliente, page)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
