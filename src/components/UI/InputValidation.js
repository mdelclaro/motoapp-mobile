import React, { Component } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { emailChanged, senhaChanged } from "../../store/actions/index";

class InputValidation extends Component {
  textChangeHandler = value => {
    this.props.onChange(this.props.name, value);
    if (this.props.name == "email") this.props.onEmailChanged(value);
    if (this.props.name == "senha") this.props.onSenhaChanged(value);
  };

  touchHandler = () => {
    this.props.onTouch(this.props.name);
  };

  render() {
    const { placeholder, error, ...rest } = this.props;
    return (
      <View>
        <TextInput
          underlineColorAndroid="transparent"
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
    width: "100%",
    borderBottomWidth: 1,
    //borderColor: '#eee',
    padding: 5,
    marginTop: 8,
    marginBottom: 8
    //justifyContent: 'center'
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onEmailChanged: email => dispatch(emailChanged(email)),
    onSenhaChanged: senha => dispatch(senhaChanged(senha))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(InputValidation);
