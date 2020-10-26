import React, {createContext, useState} from 'react';
import Amplify, {Auth} from 'aws-amplify';
// import {AuthContext} from './AuthContext';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const values = {
    user,
    setUser,
    login: async (email, password) => {
      try {
        console.log('login');
        // await auth().signInWithEmailAndPassword(email, password);
        await Auth.signIn(email, password);
      } catch (e) {
        console.log(e);
      }
    },
    register: async (email, password) => {
      try {
        console.log('register');
        // await auth().createUserWithEmailAndPassword(email, password);
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: '',
            email: email,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    logout: async () => {
      try {
        console.log('logout');
        // await auth().signOut();
        await Auth.signOut();
      } catch (e) {
        console.error(e);
      }
    },
  };

  return (
    <AuthContext.Provider value={values}>
      <>
        {children}
      </>
    </AuthContext.Provider>
  );
};
