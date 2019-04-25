import React, { Component } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { connect } from "react-redux";

import { Formik } from "formik";
import * as Yup from "yup";

import ButtonWithBackground from "../UI/ButtonWithBackground";
import InputValidation from "../UI/InputValidation";
import HeadingText from "../UI/HeadingText";
import MainText from "../UI/MainText";

import { BASE_COLOR, BACKGROUND_COLOR } from "../../config";

class SignupForm extends Component {
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
        <HeadingText style={{ color: BASE_COLOR }}>Criar conta</HeadingText>
      </MainText>
    );

    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{
          nome: this.props.nome,
          sobrenome: this.props.sobrenome,
          email: this.props.email,
          senha: this.props.senha,
          confirmPassword: ""
        }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          nome: Yup.string()
            .required("Preencha o nome")
            .min(2, "Nome deve conter 2 caracteres ou mais"),
          sobrenome: Yup.string()
            .required("Preencha o sobrenome")
            .min(2, "Sobrenome deve conter 2 caracteres ou mais"),
          email: Yup.string()
            .email("Email inválido")
            .required("Preencha o email"),
          senha: Yup.string()
            .min(6, "Senha deve conter 6 caracteres ou mais")
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
            <KeyboardAvoidingView style={styles.container} behavior="height">
              {headingText}
              <View style={styles.inputContainer}>
                <InputValidation
                  placeholder="Nome"
                  autoCapitalize="words"
                  returnKeyType="next"
                  onSubmitEditing={() => this.sobrenomeInput.focus()}
                  autoCorrect={false}
                  blurOnSubmit={false}
                  value={this.props.nome}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="nome"
                  error={touched.nome && errors.nome}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.sobrenomeInput = ref)}
                  placeholder="Sobrenome"
                  autoCapitalize="words"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.emailInput.focus()}
                  autoCorrect={false}
                  value={this.props.sobrenome}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="sobrenome"
                  error={touched.sobrenome && errors.sobrenome}
                  style={styles.input}
                />
                <InputValidation
                  myRef={ref => (this.emailInput = ref)}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.senhaInput.focus()}
                  autoCorrect={false}
                  value={this.props.email}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="email"
                  error={touched.email && errors.email}
                  style={styles.input}
                />

                <InputValidation
                  myRef={ref => (this.senhaInput = ref)}
                  placeholder="Senha"
                  autoCapitalize="none"
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => this.confirmarSenhaInput.focus()}
                  secureTextEntry
                  value={this.props.senha}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="senha"
                  error={touched.senha && errors.senha}
                  style={styles.input}
                />

                <InputValidation
                  myRef={ref => (this.confirmarSenhaInput = ref)}
                  placeholder="Confirmar senha"
                  autoCapitalize="none"
                  returnKeyType="send"
                  secureTextEntry
                  onSubmitEditing={handleSubmit}
                  value={values.confirmPassword}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name="confirmPassword"
                  error={touched.confirmPassword && errors.confirmPassword}
                  style={styles.input}
                />
              </View>
              {!this.props.isLoading ? (
                <View style={{ width: "80%" }}>
                  <ButtonWithBackground
                    myRef={ref => (this.submitButton = ref)}
                    color={BASE_COLOR}
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
                  textColor={BASE_COLOR}
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
    alignItems: "center",
    backgroundColor: BACKGROUND_COLOR
  },
  input: {
    borderBottomColor: "#bbb"
  },
  inputContainer: {
    width: "80%"
  }
});

const mapStateToProps = state => {
  return {
    isLoading: state.ui.isLoading,
    email: state.form.email,
    senha: state.form.senha,
    nome: state.form.nome,
    sobrenome: state.form.sobrenome
  };
};

export default connect(mapStateToProps)(SignupForm);
