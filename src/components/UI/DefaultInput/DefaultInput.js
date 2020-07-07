import React from "react";
import { TextInput, StyleSheet } from "react-native";

const defaultInput = props => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 2,
    borderColor: "#eee",
    padding: 5,
    marginTop: 20,
    marginBottom: 20,
    height: 50
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: "red"
  }
});

export default defaultInput;
