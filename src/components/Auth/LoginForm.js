import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";

import { BASE_COLOR, BACKGROUND_COLOR } from "../../config";

class LoginForm extends Component {
  componentDidMount() {
    if (
      this.form.initialValues.email !== "" ||
      this.form.initialValues.senha !== ""
    ) {
      this.form.setFieldValue(
        this.form.email,
        this.form.initialValues.email,
        true
      );
      this.form.setFieldValue(
        this.form.senha,
        this.form.initialValues.senha,
        true
      );
    }
  }

  render() {
    let headingText = (
      <MainText>
        <HeadingText style={{ color: BASE_COLOR }}>MotoApp</HeadingText>
      </MainText>
    );

    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{ email: this.props.email, senha: this.props.senha }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email inválido")
            .required("Preencha o email"),
          senha: Yup.string()
            .min(4, "Senha deve conter 4 caracteres")
            .required("Preencha a senha")
        })}
        render={({
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          isValid
        }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="height">
              {headingText}
              <View style={styles.inputContainer}>
                <InputValidation
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.props.email}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  onSubmitEditing={() => this.senhaInput.focus()}
                  blurOnSubmit={false}
                  name="email"
                  error={touched.email && errors.email}
                  style={styles.input}
                />
                <View style={styles.passwordContainer}>
                  <View style={styles.passwordWrapper}>
                    <InputValidation
                      myRef={ref => (this.senhaInput = ref)}
                      placeholder="Senha"
                      autoCapitalize="none"
                      secureTextEntry
                      value={this.props.senha}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      onSubmitEditing={handleSubmit}
                      name="senha"
                      error={touched.senha && errors.senha}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
              {!this.props.isLoading ? (
                <View style={{ width: "80%" }}>
                  <ButtonWithBackground
                    color={BASE_COLOR}
                    onPress={handleSubmit}
                    isDisabled={!isValid}
                  >
                    Entrar
                  </ButtonWithBackground>
                </View>
              ) : (
                <ActivityIndicator />
              )}
              {!this.props.isLoading ? (
                <ButtonWithBackground
                  onPress={this.props.onSwitchAuthMode}
                  textColor={BASE_COLOR}
                >
                  Não tem uma conta? Crie agora
                </ButtonWithBackground>
              ) : null}
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        )}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  input: {
    borderBottomColor: "#bbb"
  },
  inputContainer: {
    width: "80%"
  },
  passwordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  passwordWrapper: {
    width: "100%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    email: state.form.email,
    senha: state.form.senha
  };
};

export default connect(mapStateToProps)(LoginForm);
