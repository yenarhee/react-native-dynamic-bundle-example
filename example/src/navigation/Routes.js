import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Auth, Hub} from 'aws-amplify';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import {AuthContext} from './AuthProvider';
import Loading from '../components/Loading';

export default function Routes() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}
