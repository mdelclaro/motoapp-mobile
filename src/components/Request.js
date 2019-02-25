import React, { Component } from "react";
import {
  View,
  StyleSheet
  // Dimensions,
  // KeyboardAvoidingView,
  // Keyboard,
  // TouchableWithoutFeedback,
  // ActivityIndicator
} from "react-native";
// import { connect } from 'react-redux';

import { Formik } from "formik";
import * as Yup from "yup";

import Input from "./UI/Input";

class Request extends Component {
  render() {
    return (
      <Formik
        initialValues={{ from: "", destination: "" }}
        onSubmit={this.props.sendRequest}
        validationSchema={Yup.object().shape({
          from: Yup.string(),
          destination: Yup.string().required("Insira o destination")
        })}
        render={({ values, setFieldValue }) => (
          <View style={styles.inputContainer}>
            <Input
              name="from"
              placeholder="from"
              value={values.from}
              onChange={setFieldValue}
              style={styles.input}
            />
            <Input
              name="destination"
              placeholder="destination"
              value={values.destination}
              onChange={setFieldValue}
              style={styles.input}
            />
          </View>
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
  inputContainer: {
    position: "absolute",
    width: "90%",
    top: 50
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb",
    opacity: 0.83,
    borderRadius: 25
  },
  buttonContainer: {
    position: "absolute",
    bottom: 25
  }
});

// const mapStateToProps = state => {
//   return {
//     isLoading: state.ui.isLoading
//   };
// };

//export default connect(mapStateToProps)(LoginForm);
export default Request;
