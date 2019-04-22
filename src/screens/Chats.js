import React, { Component, Fragment } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator
} from "react-native";
import { List, Appbar } from "react-native-paper";
import { Navigation } from "react-native-navigation";
import { connect } from "react-redux";
import FastImage from "react-native-fast-image";
import moment from "moment";

moment.locale("pt-br");

import { getChats } from "../store/actions/";
import { BASE_COLOR, IMAGES_URL } from "../config";

class Chats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false
    };

    this.modalDismissedListener = Navigation.events().registerModalDismissedListener(
      ({ componentId }) => {
        if (componentId === "chat") {
          this.setState(previousState => {
            refresh: !previousState.refresh;
          });
        }
      }
    );
  }

  async componentDidMount() {
    const { getChats, idCliente } = this.props;
    await getChats(idCliente);
  }

  componentWillUnmount() {
    this.modalDismissedListener.remove();
  }

  renderItem(data) {
    const { idMotoqueiro, mensagens, idCliente } = data.item;
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
            right={() => (
              <Text>{moment(mensagens[0].updatedAt).fromNow()}</Text>
            )}
          />
        </View>
      </TouchableOpacity>
    );
  }

  goBack = () => {
    Navigation.dismissModal("chats");
  };

  render() {
    return (
      <Fragment>
        <Appbar.Header>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title="Mensagens" />
        </Appbar.Header>
        <View style={styles.container}>
          {this.props.isLoading ? (
            <ActivityIndicator size="large" color={BASE_COLOR} />
          ) : this.props.chats.length > 0 ? (
            <FlatList
              extraData={this.state}
              data={this.props.chats}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ flex: 1, paddingTop: 40 }}>
              <Text style={styles.text}>Nenhuma conversa...</Text>
            </View>
          )}
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f8f8f8"
  },
  image: {
    alignSelf: "center",
    paddingBottom: 15,
    width: 55,
    height: 55,
    borderRadius: 100
  },
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginTop: 100,
    color: "#CCC"
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
  getChats: idCliente => getChats(idCliente, 0, null)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats);
