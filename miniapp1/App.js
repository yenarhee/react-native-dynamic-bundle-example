/**
 * Sample RNDynamicBundle app
 * https://github.com/mauritsd/react-native-dynamic-bundle
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';
import {
  setActiveBundle,
  registerBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
} from 'react-native-dynamic-bundle';
import {Text, Title} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://raw.githubusercontent.com/yenarhee/self-hosting-example/master/dist/bundles/main.jsbundle',
      inputData: '',
      commonData: '',
    };
  }

  render() {
    return (
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
    );
  }

  _onBackButtonPress = async () => {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   //alert('You can use the location');
    //   console.log('write granted');
    // } else {
    //   console.log('write denied');
    // }

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
      const value = await AsyncStorage.getItem('DATA');
      if (value !== null) {
        // We have data!!
        this.state.commonData = value;
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textInput: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
