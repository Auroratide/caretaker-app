import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';
import PatientDashboard from './App/views/PatientDashboard/';

export default class caretaker extends Component {
  render() {
    return (
        <PatientDashboard />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    margin: 15,
  },
});

AppRegistry.registerComponent('caretaker', () => caretaker);
