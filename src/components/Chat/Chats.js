import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text
} from "react-native";
import { List } from "react-native-paper";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";

import { getChats } from "../../store/actions/";

class Chats extends Component {
  componentDidMount() {
    const { getChats, idCliente } = this.props;
    getChats(idCliente);
  }

  renderItem(data) {
    const { idMotoqueiro, mensagens } = data.item;
    console.log(mensagens);
    console.log(mensagens.length);
    return (
      <TouchableOpacity
        onPress={() => {
          Navigation.showModal({
            stack: {
              id: "chat",
              children: [
                {
                  component: {
                    id: "chat",
                    name: "motoapp.Chat"
                  }
                }
              ]
            }
          });
        }}
      >
        <View
          style={{
            backgroundColor: "#f8f8f8",
            borderBottomWidth: 1,
            borderBottomColor: "#e4e4e4"
          }}
        >
          <List.Item
            title={idMotoqueiro.nome}
            description={mensagens[mensagens.length - 1].mensagem}
            left={() => (
              <Image
                source={require("../../assets/avatar/avatar.png")}
                style={styles.image}
                fallback
              />
            )}
            right={() => <Text>12:35</Text>}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
        <FlatList
          data={this.props.chats}
          renderItem={this.renderItem}
          key={this.props.chats._id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    alignSelf: "center",
    paddingBottom: 15,
    width: 55,
    height: 55,
    borderRadius: 100
  }
});

const mapStateToProps = state => {
  return {
    chats: state.chats.chats,
    idCliente: state.auth.userId
  };
};

const mapDispatchToProps = {
  getChats: idCliente => getChats(idCliente)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
