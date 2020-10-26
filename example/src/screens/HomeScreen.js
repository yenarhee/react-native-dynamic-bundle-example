import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput, Text} from 'react-native';
import {
  setActiveBundle,
  registerBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
} from 'react-native-dynamic-bundle';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://raw.githubusercontent.com/yenarhee/react-native-dynamic-bundle-example/master/bundles/miniapp1.ios.bundle',
      commonData: '',
      inputData: '',
    };
  }

  render() {    
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          onChangeText={(url) => {
            this.setState({url});
          }}
          value={this.state.url}
          autocorrect={false}
          placeholder="URL"
          autoCapitalize="none"
        />
        <Button onPress={this._onReloadButtonPress} title="LOAD" />
        {/* <Button onPress={this._onTestReloadButtonPress} title="Load Test" /> */}
        <Button onPress={() => this.props.navigation.navigate('Data')} title="Test shared data" />
      </View>
    );
  }

  _onReloadButtonPress = async () => {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   //alert('You can use the location');
    //   console.log('write granted');
    // } else {
    //   console.log('write denied');
    // }

    const {promise} = RNFS.downloadFile({
      fromUrl: this.state.url,
      toFile: RNFS.DocumentDirectoryPath + '/test.bundle',
    });
    const result = await promise;
    console.log(RNFS.DocumentDirectoryPath);

    // const read = await RNFS.readFile(
    //   RNFS.DocumentDirectoryPath + '/test.bundle',
    // );
    // console.log(read);

    registerBundle('test', 'test.bundle');
    console.log('registerBundle');

    setActiveBundle('test');
    console.log('setActiveBundle');

    const bundles = await getBundles();
    console.log(bundles);

    const activeBundle = await getActiveBundle();
    console.log(activeBundle);

    reloadBundle();
    console.log('reloadBundle');
  };

  _onTestReloadButtonPress = async () => {
    // const granted = await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    // );
    // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //   //alert('You can use the location');
    //   console.log('write granted');
    // } else {
    //   console.log('write denied');
    // }

    setActiveBundle('test');
    console.log('setActiveBundle');

    const bundles = await getBundles();
    console.log(bundles);

    const activeBundle = await getActiveBundle();
    console.log(activeBundle);

    reloadBundle();
    console.log('reloadBundle');
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
