import React, {Component, useContext} from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';
import {
  setActiveBundle,
  registerBundle,
  reloadBundle,
  getActiveBundle,
  getBundles,
} from 'react-native-dynamic-bundle';
import {Text, Title} from 'react-native-paper';
import {AuthContext} from '../navigation/AuthProvider';

type Props = {};
export default class App extends Component<Props> {
  // static contextType = AuthContext;

  constructor(props) {
    super(props);
  }

  // componentDidMount() { 
  //   this.context.bootstrap();
  // }

  onSend(messages) {
    GiftedChat.append([], messages);
  }

  render() {
    return (
      <>
        <View style={styles.container}>
          <Title>Login Required</Title>
          <Button onPress={this._onBackButtonPress} title="Back" />
          <Text>Please log in first.</Text>
        </View>
      </>
    );
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
