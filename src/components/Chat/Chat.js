import React, { Component } from "react";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import "moment/locale/pt-br";

import { BASE_COLOR } from "../../config";

class Chat extends Component {
  state = {
    messages: []
  };

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  onSend(messages = []) {
    messages[0].sent = true;
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        placeholder="Escrever..."
        locale={"pt-br"}
        user={{
          _id: 1
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

export default Chat;
