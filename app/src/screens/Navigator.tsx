import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from '../components/TabBar';
import PlaceHolderScreen from './PlaceHolderScreen';
import InitializingScreen from './InitializingScreen';
import LoginScreen from './LoginScreen';
import TabNavigator from './TabNavigator';

const defaultScreenOptions: {headerShown: boolean} = {
  headerShown: false,
};

const Stack = createNativeStackNavigator();

const useAppState = () => {
  return 'LOGGED_IN';
};

export const tabs: {
  name: string;
  component: () => JSX.Element;
  icon: string;
}[] = [
  {
    name: 'Dashboard',
    component: PlaceHolderScreen,
    icon: 'dashboard',
  },
  {
    name: 'Playlists',
    component: PlaceHolderScreen,
    icon: 'play',
  },
  {
    name: 'Transactions',
    component: PlaceHolderScreen,
    icon: 'graph',
  },
  {
    name: 'Settings',
    component: PlaceHolderScreen,
    icon: 'gear',
  },
];

const Navigator = (): JSX.Element => {
  const appState = useAppState();
  console.log('APP_STATE: ', appState);

  return (
    <NavigationContainer>
      {appState === 'LOGGED_OUT' ? (
        <>
          <Stack.Navigator screenOptions={defaultScreenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </>
      ) : appState === 'LOGGED_IN' ? (
        <TabNavigator initialRouteName="Playlists" tabs={tabs} />
      ) : (
        <Stack.Navigator screenOptions={defaultScreenOptions}>
          <Stack.Screen name="Initializing" component={InitializingScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
