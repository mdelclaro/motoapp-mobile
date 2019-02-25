import React, { Component } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';

import startApp from '../App';

import backgroundImage from '../assets/background.png';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';

class Auth extends Component {
  // static get options() {
  //   return { topBar: { title: { text: 'Screen1' } } };
  // }

  state = {
    authMode: 'login'
  }

  componentDidMount() {
    //this.props.onAutoSignIn();
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === 'login'
          ? 'signup'
          : 'login'
      };
    });
  }

  submitHandler = (values) => {
    //this.props.onTryAuth(values, this.state.authMode);
    console.log(values);
    // Navigation.push(this.props.componentId, {
    //   component: {
    //     name: 'motoapp.Screen1',
    //     options: {
    //       topBar: {
    //         title: {
    //           text: 'Screen1',
    //         }
    //       }
    //     }
    //   }
    // });
    startApp();
  }

  render() {
    startApp();
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        {this.state.authMode === 'login'
          ? <LoginForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
          : <SignupForm
            onSwitchAuthMode={this.switchAuthModeHandler}
            submitHandler={this.submitHandler}
          />
        }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1
  }
});

export default Auth;
