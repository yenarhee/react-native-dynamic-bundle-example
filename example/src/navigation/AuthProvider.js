import React, {createContext, useState} from 'react';
import Amplify, {Auth} from 'aws-amplify';
import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';

export const AuthContext = createContext({});

const _key = 'abcd1234';

// async function _storeToken(token) {
//   try {
//     await AsyncStorage.setItem('@MySuperStore:token', token);
//   } catch (error) {
//     // Error getItem from AsyncStorage
//     console.log(error);
//   }
// }

function _setSecureValue(key, value) {
  Keychain.setGenericPassword(key /* <- can be a random string */, value, {
    service: key,
  });
}

async function _getSecureValue(key) {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return result.password;
  }
  return null;
}

function _removeSecureValue(key) {
  Keychain.resetGenericPassword({service: key});
}

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  const values = {
    state,
    user,
    bootstrap: async () => {
      let userToken;

      try {
        userToken = await _getSecureValue('@MySuperStore:' + _key);
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    },
    login: async (email, password) => {
      try {
        console.log('login');
        if (email!='guest') {
          await Auth.signIn(email, password);
        }
        _setSecureValue('@MySuperStore:' + _key, 'dummy-auth-token');
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      } catch (e) {
        console.log(e);
      }
    },
    register: async (email, password) => {
      try {
        console.log('register');
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: '',
            email: email,
          },
        });
        _setSecureValue('@MySuperStore:' + _key, 'dummy-auth-token');
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      } catch (e) {
        console.log(e);
      }
    },
    logout: async () => {
      try {
        console.log('logout');
        await Auth.signOut();
        _removeSecureValue('@MySuperStore:' + _key);
        dispatch({type: 'SIGN_OUT'});
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <AuthContext.Provider value={values}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
