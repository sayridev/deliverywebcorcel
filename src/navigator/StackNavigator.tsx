import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {DrawerNavigator} from './DrawerNavigator';
import {AuthContext} from '../context/auth/AuthContext';
import {ActivityIndicator, Colors} from 'react-native-paper';
export type RootStackParams = {
  DrawerNavigator: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {checking, status} = useContext(AuthContext);
  if (checking) {
    return (
      <ActivityIndicator
        animating={true}
        color={Colors.purple600}
        style={{flex: 1, backgroundColor: 'white'}}
        size="large"
      />
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'rgba(254,184,10,0.7)',
        },
      }}>
      {status === 'authenticated' ? (
        <Stack.Screen
          name="DrawerNavigator"
          options={{title: 'Inicio'}}
          component={DrawerNavigator}
        />
      ) : (
        <>
          <Stack.Screen
            name="LoginScreen"
            options={{title: 'Login'}}
            component={LoginScreen}
          />
          <Stack.Screen
            name="RegisterScreen"
            options={{title: 'Register'}}
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
