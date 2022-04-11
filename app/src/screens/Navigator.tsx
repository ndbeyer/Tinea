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

const stackNavigatorConfig = [
  {
    name: 'Playlists',
    component: PlaceHolderScreen,
  },
  {
    name: 'Artists',
    component: PlaceHolderScreen,
  },
  {
    name: 'Artist',
    component: PlaceHolderScreen,
  },
  {
    name: 'ArtistBetsScreen',
    component: PlaceHolderScreen,
  },
  {
    name: 'Dashboard',
    component: PlaceHolderScreen,
  },
  {
    name: 'Transactions',
    component: PlaceHolderScreen,
  },
  {
    name: 'Settings',
    component: PlaceHolderScreen,
  },
];

const getStackNavigator = initialRouteName => () => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={defaultScreenOptions}>
      {stackNavigatorConfig.map(({name, component}, index) => (
        <Stack.Screen
          key={`${name}+${index}`}
          name={name}
          component={component}
        />
      ))}
    </Stack.Navigator>
  );
};

export const tabs: {
  name: string;
  component: () => JSX.Element;
  icon: string;
}[] = [
  {
    name: 'Dashboard',
    component: getStackNavigator('Dashboard'),
    icon: 'dashboard',
  },
  {
    name: 'Playlists',
    component: getStackNavigator('Playlists'),
    icon: 'play',
  },
  {
    name: 'Transactions',
    component: getStackNavigator('Transactions'),
    icon: 'graph',
  },
  {
    name: 'Settings',
    component: getStackNavigator('Settings'),
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
