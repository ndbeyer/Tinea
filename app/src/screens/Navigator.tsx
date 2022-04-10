import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from '../components/TabBar';
import PlaceHolderScreen from './PlaceHolderScreen';
import InitializingScreen from './InitializingScreen';
import LoginScreen from './LoginScreen';

const defaultOptions = {headerShown: false, tabBarVisible: false};

const Stack = createNativeStackNavigator();

const useAppState = () => {
  return 'LOGGED_IN';
};

export const tabNavigatorConfig: {
  name: string;
  component: () => JSX.Element;
  options: {[key: string]: boolean};
  icon: string;
}[] = [
  {
    name: 'Dashboard',
    component: PlaceHolderScreen,
    options: defaultOptions,
    icon: 'dashboard',
  },
  {
    name: 'Playlists',
    component: PlaceHolderScreen,
    options: defaultOptions,
    icon: 'play',
  },
  {
    name: 'Transactions',
    component: PlaceHolderScreen,
    options: defaultOptions,
    icon: 'graph',
  },
  {
    name: 'Settings',
    component: PlaceHolderScreen,
    options: defaultOptions,
    icon: 'gear',
  },
];

const Tab = createBottomTabNavigator();

const TabNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName="Playlists"
      tabBar={props => <TabBar {...props} />}>
      {tabNavigatorConfig.map(({name, component, options}, index) => (
        <Tab.Screen
          key={`${name}+${index}`}
          name={name}
          component={component}
        />
      ))}
    </Tab.Navigator>
  );
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
      ) : appState === 'LOGGED_IN' ? (
        <TabNavigator />
      ) : (
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
