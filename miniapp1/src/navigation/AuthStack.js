import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BackScreen from '../screens/BackScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Back">
      <Stack.Screen name="Back" component={BackScreen} />
    </Stack.Navigator>
  );
}
