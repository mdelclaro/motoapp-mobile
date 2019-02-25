import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

class InputValidation extends Component {
  textChangeHandler = (value) => {
    this.props.onChange(this.props.name, value);
  }

  touchHandler = () => {
    this.props.onTouch(this.props.name);
  }

  render() {
    const { placeholder, error, ...rest } = this.props;
    return (
      <View>
        <TextInput
          underlineColorAndroid='transparent'          
          onChangeText={this.textChangeHandler}
          onBlur={this.touchHandler}
          placeholder={placeholder}
          {...rest}
          style={[styles.input, this.props.style]}
        />
        {error && <Text style={styles.errorMsg}>{error}</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    //justifyContent: 'center'
  },
  errorMsg: {
    color: 'red',
    fontSize: 12,
    justifyContent: 'center'
  }
});

export default InputValidation;
