import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
// import { connect } from 'react-redux';

import { Formik } from 'formik';
import * as Yup from 'yup';

import ButtonWithBackground from './UI/ButtonWithBackground';
import InputValidation from './UI/InputValidation';
import HeadingText from './UI/HeadingText';
import MainText from './UI/MainText';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode:
        dims.window.height > 500 ? 'portrait' : 'landscape'
    });
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Log in</HeadingText>
        </MainText>
      );
    }
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('E-mail not valid')
            .required('E-mail is required'),
          password: Yup.string()
            .min(6)
            .required('Password is required')
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
            <KeyboardAvoidingView
              style={styles.container}
              behavior='padding'
            >
              {headingText}

              {/* Inputs Container */}

              <View style={styles.inputContainer}>

                {/* Email Input */}

                <InputValidation
                  placeholder='E-mail'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  autoCorrect={false}
                  value={values.email}
                  onChange={setFieldValue}
                  onTouch={setFieldTouched}
                  name='email'
                  error={touched.email && errors.email}
                  style={styles.input}
                />

                {/* Password, ConfirmPassword container */}

                <View
                  style={styles.passwordContainer}
                >
                  {/* Password Input */}

                  <View
                    style={styles.passwordWrapper}
                  >
                    <InputValidation
                      placeholder="Password"
                      autoCapitalize='none'
                      secureTextEntry
                      value={values.password}
                      onChange={setFieldValue}
                      onTouch={setFieldTouched}
                      name='password'
                      error={touched.password && errors.password}
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
              { // Show Activity Indicator instead of button when loading
                !this.props.isLoading
                ? <ButtonWithBackground
                    color='#29aaf4'
                    onPress={handleSubmit}
                    isDisabled={!isValid}
                >
                    Submit
                  </ButtonWithBackground>
                : <ActivityIndicator />
              }
              { // Disable signup button when signin is loading
                !this.props.isLoading 
                ? <ButtonWithBackground onPress={this.props.onSwitchAuthMode}>
                    Don't have an account? Sign Up
                  </ButtonWithBackground> 
                : <ButtonWithBackground isDisabled>
                    Don't have an account? Sign Up
                  </ButtonWithBackground>
              }
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    width: '100%',
    flex: 1
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb'
  },
  inputContainer: {
    // it controls the input width,
    // better approach. makes 
    // TextInputs reusable with 100% width
    width: '80%'
  },
  passwordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  passwordWrapper: {
    width: '100%'
  }
});

// const mapStateToProps = state => {
//   return {
//     isLoading: state.ui.isLoading
//   };
// };

//export default connect(mapStateToProps)(LoginForm);
export default LoginForm;
