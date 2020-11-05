import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import LoginScreen from '../screens/LoginScreen';

const HomeAppStack = createStackNavigator();

export default function ChatApp() {
  return (
    <HomeAppStack.Navigator>
      <HomeAppStack.Screen name="Home" component={HomeScreen} />
    </HomeAppStack.Navigator>
  );
}
