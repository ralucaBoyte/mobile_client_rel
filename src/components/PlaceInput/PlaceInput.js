import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

import DefaultInput from "../UI/DefaultInput/DefaultInput";

const placeInput = props => (
    <DefaultInput
        placeholder="Feedback"
        value={props.value}
        valid={props.valid}
        touched={props.touched}
        onChangeText={props.onChangeText}
    />
);

export default placeInput;
