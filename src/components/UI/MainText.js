import React from 'react';
import { Text, StyleSheet } from 'react-native';

const mainText = props => (
  <Text style={styles.text}>
    {props.children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'transparent'
  }
});

export default mainText;
