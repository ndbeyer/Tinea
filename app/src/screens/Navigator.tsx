import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import InitializingScreen from './InitializingScreen';
import LoginScreen from './LoginScreen';

const defaultOptions = {headerShown: false, tabBarVisible: false};

const Stack = createNativeStackNavigator();

const useAppState = () => {
  return 'LOGGED_OUT';
};

const Navigator = (): JSX.Element => {
  const appState = useAppState();
  console.log('APP_STATE: ', appState);

  return (
    <NavigationContainer>
      {appState === 'LOGGED_OUT' ? (
        <>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={defaultOptions}
            />
          </Stack.Navigator>
        </>
      ) : appState === 'LOGGED_IN' ? null : ( // <LoggedInNavigator />
        <Stack.Navigator>
          <Stack.Screen
            name="Initializing"
            component={InitializingScreen}
            options={defaultOptions}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
