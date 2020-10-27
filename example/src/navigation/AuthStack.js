import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import LoaderScreen from '../screens/LoaderScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Data" component={DataScreen} />
      <Stack.Screen name="Loader" component={LoaderScreen} />
    </Stack.Navigator>
  );
}
