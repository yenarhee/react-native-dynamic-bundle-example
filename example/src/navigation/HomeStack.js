import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';

const ChatAppStack = createStackNavigator();

export default function ChatApp() {
  return (
    <ChatAppStack.Navigator screenOptions={style}>
      <ChatAppStack.Screen name="Home" component={HomeScreen} />
      <ChatAppStack.Screen name="Data" component={DataScreen} />
    </ChatAppStack.Navigator>
  );
}

const style = {
  headerStyle: {
    backgroundColor: '#6646ee',
  },
  headerTintColor: '#ffffff',
  headerTitleStyle: {
    fontSize: 22,
  },
};
