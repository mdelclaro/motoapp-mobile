import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';


class BottomModal extends Component {
  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        backdropOpacity={0}
        swipeDirection='down'
        onSwipe={this.props.onSwipe}
        style={styles.container}
      >
        <View style={styles.modalContent}>
          <Text>
            6 MIN
          </Text>
          <Text>
            Joao - EFD-3524
          </Text>
          <TouchableOpacity onPress={this.props.onLogout}>
            <View style={styles.infoContainer}>
              <Icon
                name={Platform.OS === 'android' 
                ? 'md-information-circle' : 'ios-information-circle'}
                size={30}
                color='#aaa'
                style={styles.modalItemIcon}
              />
              <Text>Informacoes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    margin: 0,
    width: '100%',
  },
  modalContent: {
    height: Dimensions.get('window').height * 0.3,
    //flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  modalItemIcon: {
    marginRight: 10
  }
});

export default BottomModal;
