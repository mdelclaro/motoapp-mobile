import React, { Component } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { connect } from "react-redux";

import startApp from "../App";
import {
  tryAuth,
  authAutoSignIn,
  signUp,
  clearForm,
  emailChanged
} from "../store/actions/index";

import backgroundImage from "../assets/background.png";
import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";

class Auth extends Component {
  // static get options() {
  //   return { topBar: { title: { text: 'Screen1' } } };
  // }

  state = {
    authMode: "login"
  };

  componentDidMount() {
    this.props.onAutoSignIn();
    //this.props.onTryAuth("tiaozola@gmail.com.br", "1234");
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  submitHandler = async values => {
    if (this.state.authMode === "login") {
      this.props.onTryAuth(values.email, values.senha);
    } else {
      const result = await this.props.onSignUp(
        values.email,
        values.senha,
        values.nome,
        values.sobrenome
      );
      if (result) {
        this.props.onClearForm();
        this.props.onEmailChange(values.email);
        this.setState({
          authMode: "login"
        });
      }
    }
  };

  render() {
    return (
      // <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.backgroundImage}>
        {this.state.authMode === "login" ? (
          <LoginForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
        ) : (
          <SignupForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
        )}
      </View>
      // </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    flex: 1
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onTryAuth: (email, senha) => dispatch(tryAuth(email, senha)),
    onAutoSignIn: () => dispatch(authAutoSignIn()),
    onSignUp: (email, senha, nome, sobrenome) =>
      dispatch(signUp(email, senha, nome, sobrenome)),
    onClearForm: () => dispatch(clearForm()),
    onEmailChange: email => dispatch(emailChanged(email))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
