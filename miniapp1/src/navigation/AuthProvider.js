import React, {createContext} from 'react';
import * as Keychain from 'react-native-keychain';

export const AuthContext = createContext({});

const _key = 'abcd1234';

async function _getSecureValue(key) {
  const result = await Keychain.getGenericPassword({service: key});
  if (result) {
    return result.password;
  }
  return null;
}

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
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
    bootstrap: async () => {
      let userToken;

      try {
        // userToken = await _getSecureValue('@MySuperStore:' + _key);
        userToken = 'dummy-auth-token';
      } catch (e) {
        // Restoring token failed
        console.log(e);
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    },
  };

  return (
    <AuthContext.Provider value={values}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
