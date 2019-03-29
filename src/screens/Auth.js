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

class Auth extends Component {
  state = {
    authMode: "login"
  };

  componentDidMount() {
    this.props.onAutoSignIn();
    // this.props.onTryAuth("matheus_delclaro@hotmail.com", "123456");
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

  renderContent = () => {
    let content;
    console.log(this.props.isLoading);
    if (this.props.isLoading) {
      content = <ActivityIndicator size="large" />;
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
    justifyContent: "center"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading
  };
};

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
  mapStateToProps,
  mapDispatchToProps
)(Auth);
