import React, { Component } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import { List } from "react-native-paper";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import moment from "moment";

moment.locale("pt-br");

import { getChats } from "../../store/actions/";
import { BASE_COLOR, IMAGES_URL } from "../../config";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.modalDismissedListener = Navigation.events().registerModalDismissedListener(
      ({ componentId, modalsDismissed }) => {
        if (componentId === "chat")
          this.setState({ refresh: !this.state.refresh });
      }
    );
  }

  state = {
    refresh: false
  };

  async componentDidMount() {
    const { getChats, idCliente } = this.props;
    await getChats(idCliente);
  }

  componentWillUnmount() {
    this.modalDismissedListener.remove();
  }

  renderItem(data) {
    const { idMotoqueiro, mensagens, idCliente, updatedAt } = data.item;
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
                    name: "motoapp.Chat",
                    passProps: {
                      mensagens,
                      idMotoqueiro,
                      idCliente,
                      index: data.index
                    }
                  }
                }
              ]
            }
          });
        }}
      >
        <View
          style={{
            backgroundColor: "#f8f8f8"
            // borderBottomWidth: 1,
            // borderBottomColor: "#e4e4e4"
          }}
        >
          <List.Item
            title={idMotoqueiro.nome}
            description={mensagens[0].text}
            left={() => (
              <FastImage
                source={{ uri: IMAGES_URL + idMotoqueiro.imgPerfil }}
                style={styles.image}
                fallback
              />
            )}
            right={() => <Text>{moment(updatedAt).fromNow()}</Text>}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#f8f8f8",
          paddingTop: 40
        }}
      >
        {this.props.isLoading ? (
          <ActivityIndicator size="large" color={BASE_COLOR} />
        ) : this.props.chats.length > 0 ? (
          <FlatList
            extraData={this.state.refresh}
            data={this.props.chats}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text
            style={{
              flex: 1,
              fontSize: 20,
              // alignSelf: "center",
              textAlign: "center",
              marginTop: 100,
              color: "#CCC"
            }}
          >
            Nenhuma conversa...
          </Text>
        )}
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
    idCliente: state.auth.userId,
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  getChats: idCliente => getChats(idCliente, 0)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
