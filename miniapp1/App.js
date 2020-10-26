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

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      url: 'https://raw.githubusercontent.com/yenarhee/self-hosting-example/master/dist/bundles/main.jsbundle',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Title>Miniapp</Title> */}
        <Button onPress={this._onBackButtonPress} title="Back" />
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
