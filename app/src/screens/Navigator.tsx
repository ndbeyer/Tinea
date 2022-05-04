import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/TabBar';
import PlaceHolderScreen from './PlaceHolderScreen';
import InitializingScreen from './InitializingScreen';
import LoggedOutView from './LoggedOutView';

import { useAppState } from '../utils/user';

type Screen = {
	name: string;
	component: ({ navigation }: { navigation: any }) => JSX.Element;
	tab?: boolean;
	icon?: string;
};

type Tab = {
	name: string;
	component: ({ navigation }: { navigation: any }) => JSX.Element;
	icon: string;
};

// define all Screens that the app will have

const screens: Screen[] = [
	{
		name: 'Dashboard',
		component: PlaceHolderScreen,
		tab: true,
		icon: 'dashboard',
	},
	{
		name: 'Playlists',
		component: PlaceHolderScreen,
		tab: true,
		icon: 'play',
	},
	{
		name: 'Transactions',
		component: PlaceHolderScreen,
		tab: true,
		icon: 'graph',
	},
	{
		name: 'Settings',
		component: PlaceHolderScreen,
		tab: true,
		icon: 'gear',
	},
	{
		name: 'Test',
		component: PlaceHolderScreen,
	},
];

// since we implement our own header, we hide the header of react navigation everywhere

const defaultScreenOptions: { headerShown: boolean } = {
	headerShown: false,
};

// helper function that creates a stack navigator that has all screens in it with a specific initialRoute

const Stack = createNativeStackNavigator();

const generateStackNavigatorWithAllScreens = (initialRouteName) => () => {
	return (
		<Stack.Navigator initialRouteName={initialRouteName} screenOptions={defaultScreenOptions}>
			{screens.map(({ name, component }, index) => (
				<Stack.Screen key={`${name}+${index}`} name={name} component={component} />
			))}
		</Stack.Navigator>
	);
};

// extract only the screens that should be used for tabs and mount the generated stack navigator with all screens on each tab

export const tabs = screens
	.filter(({ tab }) => tab === true)
	.map(({ name: screenName, icon }) => ({
		name: `${screenName}Tab`,
		component: generateStackNavigatorWithAllScreens(screenName),
		icon,
	})) as Tab[];

// create tab navigator from tabs

const Tab = createBottomTabNavigator();

const TabNavigator = ({
	initialRouteName,
	tabs,
}: {
	initialRouteName: string;
	tabs: {
		name: string;
		component: ({ navigation }: { navigation: any }) => JSX.Element;
		icon: string;
	}[];
}): JSX.Element => {
	return (
		<Tab.Navigator
			initialRouteName={initialRouteName}
			tabBar={(props) => <TabBar {...props} />}
			screenOptions={defaultScreenOptions}
		>
			{tabs.map(({ name, component }, index) => (
				<Tab.Screen key={`${name}+${index}`} name={name} component={component} />
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
					<Stack.Navigator screenOptions={defaultScreenOptions}>
						<Stack.Screen name="Login" component={LoggedOutView} />
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
