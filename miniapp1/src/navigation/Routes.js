import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthContext} from './AuthProvider';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import Loading from '../components/Loading';

export default function Routes() {
  const {state, bootstrap } = useContext(AuthContext);

  if (state.userToken == null) {
      bootstrap();
  }

  return (
    <NavigationContainer>
      {state.userToken ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
