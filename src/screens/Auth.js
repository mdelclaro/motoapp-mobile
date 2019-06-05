import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";

import {
  tryAuth,
  authAutoSignIn,
  signUp,
  clearForm,
  emailChanged
} from "../store/actions/index";

import SignupForm from "../components/Auth/SignupForm";
import LoginForm from "../components/Auth/LoginForm";
import { BASE_COLOR, BACKGROUND_COLOR } from "../config";

class Auth extends Component {
  state = {
    authMode: "login"
  };

  componentDidMount() {
    this.props.authAutoSignIn();
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
      this.props.tryAuth(values.email, values.senha);
    } else {
      const result = await this.props.signUp(
        values.email,
        values.senha,
        values.nome,
        values.sobrenome
      );
      if (result) {
        this.props.clearForm();
        this.props.emailChange(values.email);
        this.setState({
          authMode: "login"
        });
      }
    }
  };

  renderContent = () => {
    let content;
    if (this.props.isLoading) {
      content = <ActivityIndicator size="large" color={BASE_COLOR} />;
    } else {
      content =
        this.state.authMode === "login" ? (
          <LoginForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
        ) : (
          <SignupForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
        );
    }
    return content;
  };

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

const mapDispatchToProps = {
  tryAuth: (email, senha) => tryAuth(email, senha),
  authAutoSignIn,
  clearForm,
  emailChanged: email => emailChanged(email),
  signUp: (email, senha, nome, sobrenome) =>
    signUp(email, senha, nome, sobrenome)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
