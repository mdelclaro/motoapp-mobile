import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import avatar from "../assets/avatar/avatar.png";

class Menu extends Component {
  render() {
    return (
      <View
        style={[
          styles.container
          // { width: Dimensions.get("window").width * 0.7 }
        ]}
      >
        <Image
          source={avatar}
          style={{
            alignSelf: "center",
            paddingBottom: 3,
            width: 60,
            height: 60,
            resizeMode: "center",
            borderRadius: 100
          }}
        />
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItemFirst}>
            <Icon
              name={Platform.OS === "android" ? "md-person" : "ios-person"}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Perfil</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={
                Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
              }
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Mensagens</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
              size={30}
              color="#aaa"
              style={[styles.drawerItemIcon, { color: "#fc6f6f" }]}
            />
            <Text style={{ color: "#fc6f6f" }}>Sair</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1
  },
  drawerItemFirst: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});

export default Menu;
