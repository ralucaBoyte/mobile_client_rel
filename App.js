import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from "./src/screens/Auth/Auth";

export default function App() {
  return (
    <AuthScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
