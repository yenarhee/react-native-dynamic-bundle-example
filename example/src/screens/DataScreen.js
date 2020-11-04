import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      commonData: '',
      inputData: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
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
