import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={style}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
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
