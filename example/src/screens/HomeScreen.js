import React, {Component, useContext, useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {Text, Title} from 'react-native-paper';

import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends Component<Props> {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {userToken: null};
  }

  async checkToken() {
    console.log('checkToken');
    console.log(this.state);
    try {
      const userToken = await this.context.getToken();
      if (userToken !== null) {
        this.setState({userToken});
      }
    } catch (error) {
      // Error getItem from AsyncStorage
      console.log(error);
    }
  }

  componentDidMount() {
    this.context.bootstrap();
  }

  render() {
    console.log('render');
    console.log(this.context);
    if (this.context.state.userToken == null) {
      // No token found, user isn't signed in
      return (
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          title="Login"
        />
      );
    } else {
      // User is signed in
      return (
        <View style={styles.container}>
          <Title>Home Screen</Title>
          <Button
            onPress={() => this.props.navigation.navigate('Data')}
            title="Test shared data"
          />
          <Button
            onPress={() => this.props.navigation.navigate('Loader')}
            title="Load a bundle"
          />
          <Button onPress={() => this.context.logout()} title="Logout" />
        </View>
      );
    }
  }
}
