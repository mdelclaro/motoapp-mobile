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

class SignupForm extends Component {
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
          <HeadingText>Sign Up</HeadingText>
        </MainText>
      );
    }
    return (
      <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        onSubmit={this.props.submitHandler}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('E-mail not valid')
            .required('E-mail is required'),
          password: Yup.string()
            .min(6)
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf(
              [Yup.ref('password', null)],
              'Passwords must match!'
            ).required('Confirm Password is required')
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
                    style={
                      this.state.viewMode === 'portrait' ||
                        this.state.authMode === 'login'
                        ? styles.portraitPasswordContainer
                        : styles.landscapePasswordContainer
                    }
                  >
                    {/* Password Input */}

                    <View
                      style={
                        this.state.viewMode === 'portrait' ||
                          this.state.authMode === 'login'
                          ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper
                      }
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

                    {/* ConfirmPassword Input */}

                    <View
                      style={
                        this.state.viewMode === 'portrait'
                          ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper
                      }
                    >
                      <InputValidation
                        placeholder="Confirm Password"
                        autoCapitalize='none'
                        secureTextEntry
                        value={values.confirmPassword}
                        onChange={setFieldValue}
                        onTouch={setFieldTouched}
                        name='confirmPassword'
                        error={touched.confirmPassword && errors.confirmPassword}
                        style={styles.input}
                      />
                    </View>
                  </View>
                </View>
                {
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
                {
                  !this.props.isLoading
                  ? <ButtonWithBackground onPress={this.props.onSwitchAuthMode}>
                      Switch back to Login
                    </ButtonWithBackground>
                  : <ButtonWithBackground isDisabled>
                      Switch back to Login
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
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
});

// const mapStateToProps = state => {
//   return {
//     isLoading: state.ui.isLoading
//   };
// };

// export default connect(mapStateToProps)(SignupForm);

export default SignupForm;
