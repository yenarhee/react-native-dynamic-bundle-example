import React, {Component, useContext, useState, useEffect} from 'react';
import {Alert, View, StyleSheet, Button} from 'react-native';
import {Text, Title, TextInput} from 'react-native-paper';

import {AuthContext} from '../navigation/AuthProvider';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-community/async-storage';
// import NotifService from '../services/NotifService';

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
    // this.notif = new NotifService(
    //   this.onRegister.bind(this),
    //   this.onNotif.bind(this),
    // );
  }

  componentDidMount() {
    this.context.bootstrap();
    console.log(React.version);
  }

  render() {
    console.log('render');
    console.log(this.context);
    if (this.context.state.userToken == null) {
      // No token found, user isn't signed in
      return (
        <Title>Auth Error</Title>
      );
    } else {
      // User is signed in
      return (
      <>
        <View style={styles.container}>
          <Title>Miniapp</Title>
          <Button onPress={this._onBackButtonPress} title="Back" />
          <Text>Common Data: {this.state.commonData}</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(inputData) => {
              this.setState({inputData});
            }}
            value={this.state.inputData}
            autocorrect={false}
            placeholder="Common Data"
            autoCapitalize="none"
          />
          <Button onPress={this._storeData} title="Save Data" />
          <Button onPress={this._retrieveData} title="Retrieve Data" />
        </View>
        {/* <GiftedChat
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        /> */}
      </>
      );
    }
  }

  _storeData = async () => {
    console.log('_storeData');
    try {
      await AsyncStorage.setItem(
        'DATA',
        this.state.inputData
      );
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  _retrieveData = async () => {
    try {
      const commonData = await AsyncStorage.getItem('DATA');
      if (commonData !== null) {
        // We have data!!
        this.setState({commonData});
        console.log(commonData);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  // onRegister(token) {
  //   this.setState({registerToken: token.token, fcmRegistered: true});
  // }

  // onNotif(notif) {
  //   Alert.alert(notif.title, notif.message);
  // }
}
