import React, {Component} from 'react';
import {Alert, View, StyleSheet, Button, TextInput} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {
  setActiveBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
} from 'react-native-dynamic-bundle';

import {AuthContext} from '../navigation/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import NotifService from '../services/NotifService';
import {LocalNotification} from '../services/LocalNotificationService';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {};
export default class App extends Component<Props> {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      userToken: null,
      commonData: '',
      inputData: '',
    };
    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );
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
      return <Title>Auth Error</Title>;
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
            <Button
              onPress={() => LocalNotification()}
              title="Local Push Notification"
            />
          </View>
        </>
      );
    }
  }

  _onBackButtonPress = async () => {
    setActiveBundle(null);
    console.log('setActiveBundle');

    const bundles = await getBundles();
    console.log(bundles);

    const activeBundle = await getActiveBundle();
    console.log(activeBundle);

    reloadBundle();
    console.log('reloadBundle');
  };

  _storeData = async () => {
    console.log('_storeData');
    try {
      await AsyncStorage.setItem('DATA', this.state.inputData);
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

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }
}
