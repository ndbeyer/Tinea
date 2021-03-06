import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBar from '../components/TabBar';
import PlaceHolderScreen from './PlaceHolderScreen';
import LoadingView from './LoadingView';
import LoggedOutView from './LoggedOutView';
import SettingsView from './SettingsView';
import QuestionaireView from './QuestionaireView';
import PharmaceuticalsView from './PharmaceuticalsView';

import { useAppState } from '../utils/user';
import InitialView from './InitialView';

type Screen = {
	name: string;
	component: ({ navigation }: { navigation: any }) => JSX.Element;
	tab?: boolean;
	icon?: string;
	tabLabel?: string;
};

type Tab = {
	name: string;
	component: ({ navigation }: { navigation: any }) => JSX.Element;
	icon: string;
	tabLabel?: string;
};

// define all Screens that the app will have

const screens: Screen[] = [
	{
		name: 'Products',
		component: PharmaceuticalsView,
		tab: true,
		icon: 'dashboard',
		tabLabel: 'Produkte',
	},
	{
		name: 'Fragen',
		component: QuestionaireView,
		tab: true,
		icon: 'play',
		tabLabel: 'Fragen',
	},
	{
		name: 'Transactions',
		component: PlaceHolderScreen,
		tab: true,
		icon: 'graph',
	},
	{
		name: 'Settings',
		component: SettingsView,
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
	.map(({ name: screenName, icon, tabLabel }) => ({
		name: `${screenName}Tab`,
		component: generateStackNavigatorWithAllScreens(screenName),
		icon,
		tabLabel,
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
	const userStatus = 'INITIAL';
	console.log('APP_STATE: ', appState);

	return (
		<NavigationContainer>
			{appState === 'LOADING' ? (
				<Stack.Navigator screenOptions={defaultScreenOptions}>
					<Stack.Screen name="Loading" component={LoadingView} />
				</Stack.Navigator>
			) : appState === 'LOGGED_OUT' ? (
				<>
					<Stack.Navigator screenOptions={defaultScreenOptions}>
						<Stack.Screen name="Login" component={LoggedOutView} />
					</Stack.Navigator>
				</>
			) : appState === 'LOGGED_IN' ? (
				userStatus === 'INITIAL' ? (
					<Stack.Navigator screenOptions={defaultScreenOptions}>
						<Stack.Screen name="Willkommen" component={InitialView} />
					</Stack.Navigator>
				) : (
					<TabNavigator initialRouteName="Playlists" tabs={tabs} />
				)
			) : null}
		</NavigationContainer>
	);
};

export default Navigator;
