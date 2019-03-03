import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import ButtonWithBackground from "./UI/ButtonWithBackground";
import InputValidation from "./UI/InputValidation";
import HeadingText from "./UI/HeadingText";
import MainText from "./UI/MainText";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
  };

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

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  render() {
    let headingText = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={{ color: "#29aaf4" }}>Criar conta</HeadingText>
        </MainText>
      );
    }
    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{
          email: this.props.email,
          senha: this.props.senha,
          confirmPassword: ""
        }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email inválido")
            .required("Preencha o email"),
          senha: Yup.string()
            .min(6, "Senha deve conter 6 caracteres")
            .required("Preencha a senha"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("senha", null)], "As senhas devem ser iguais")
            .required("Confirme a senha")
        })}
        render={({
          values,
          handleSubmit,
          setFieldValue,
          errors,
          touched,
          setFieldTouched,
          isValid
        }) => (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              {headingText}

              {/* Inputs Container */}

              <View style={styles.inputContainer}>
                {/* Email Input */}

                <InputValidation
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={this.props.email}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="email"
                  error={touched.email && errors.email}
                  style={styles.input}
                />

                {/* Password, ConfirmPassword container */}

                <View
                  style={
                    this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                      ? styles.portraitPasswordContainer
                      : styles.landscapePasswordContainer
                  }
                >
                  {/* Password Input */}

                  <View
                    style={
                      this.state.viewMode === "portrait" ||
                      this.state.authMode === "login"
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                    }
                  >
                    <InputValidation
                      placeholder="Senha"
                      autoCapitalize="none"
                      secureTextEntry
                      value={this.props.senha}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="senha"
                      error={touched.senha && errors.senha}
                      style={styles.input}
                    />
                  </View>

                  {/* ConfirmPassword Input */}

                  <View
                    style={
                      this.state.viewMode === "portrait"
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                    }
                  >
                    <InputValidation
                      placeholder="Confirmar senha"
                      autoCapitalize="none"
                      secureTextEntry
                      value={values.confirmPassword}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name="confirmPassword"
                      error={touched.confirmPassword && errors.confirmPassword}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
              {!this.props.isLoading ? (
                <View style={{ width: "80%" }}>
                  <ButtonWithBackground
                    color="#29aaf4"
                    onPress={handleSubmit}
                    isDisabled={!isValid}
                  >
                    Enviar
                  </ButtonWithBackground>
                </View>
              ) : (
                <ActivityIndicator />
              )}
              {!this.props.isLoading ? (
                <ButtonWithBackground
                  onPress={this.props.onSwitchAuthMode}
                  textColor="#29aaf4"
                >
                  Cancelar
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
    alignItems: "center"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  input: {
    //backgroundColor: "#eee",
    borderBottomColor: "#bbb"
  },
  inputContainer: {
    // it controls the input width,
    // better approach. makes
    // TextInputs reusable with 100% width
    width: "80%"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
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

export default connect(mapStateToProps)(SignupForm);
