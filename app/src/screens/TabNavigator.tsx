import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBar from '../components/TabBar';

const defaultScreenOptions: {headerShown: boolean} = {
  headerShown: false,
};

const Tab = createBottomTabNavigator();

const TabNavigator = ({
  initialRouteName,
  tabs,
}: {
  initialRouteName: string;
  tabs: {
    name: string;
    component: ({navigation}: {navigation: any}) => JSX.Element;
    icon: string;
  }[];
}): JSX.Element => {
  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      tabBar={props => <TabBar {...props} />}
      screenOptions={defaultScreenOptions}>
      {tabs.map(({name, component}, index) => (
        <Tab.Screen
          key={`${name}+${index}`}
          name={name}
          component={component}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
