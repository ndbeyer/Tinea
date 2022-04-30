import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Paragraph } from './Text';
import BlurView from './BlurView';
import Icon from './Icon';
import { tabs } from '../screens/Navigator';

const DEFAULT_FOOTER_HEIGHT = 7;

const FooterWrapper = styled.View`
	height: ${(p) => p.height}px;
	width: 100%;
	position: absolute;
	bottom: 0;
	background-color: transparent;
`;

const FooterContent = styled.View`
	max-width: 100%;
	height: 100%;
	margin: ${(p) => p.theme.rem2px('0rem 2rem')};
	height: ${(p) => p.height}px;
	border-radius: ${(p) => p.height}px;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
`;

const TabIconWrapper = styled.TouchableOpacity`
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const useTabBarHeight = (
	{
		footerContentHeight,
	}: {
		footerContentHeight?: number;
	} = { footerContentHeight: 0 }
): number => {
	const theme = useTheme();
	console.log('TabBar theme', theme);
	const { bottom: bottomInsets } = useSafeAreaInsets();
	const footerHeight =
		DEFAULT_FOOTER_HEIGHT * theme.rem + bottomInsets + (footerContentHeight as number);
	return footerHeight;
};

const MyTabBar = ({ state, navigation }): JSX.Element => {
	const theme = useTheme();
	const { bottom: bottomInsets } = useSafeAreaInsets();
	const footerHeight = DEFAULT_FOOTER_HEIGHT * theme.rem + bottomInsets;

	const initialStackNavigatorState = React.useRef();

	// TODO:
	// React.useEffect(() => {
	// 	(async () => {
	// 		const initialStackNavigatorStateJSON = await AsyncStorage.getItem('STACK_ROUTES');
	// 		if (initialStackNavigatorStateJSON) {
	// 			initialStackNavigatorState.current = JSON.parse(initialStackNavigatorStateJSON);
	// 			const initialTabRouteName = await AsyncStorage.getItem('TAB_ROUTE_NAME');
	// 			navigation.navigate(initialTabRouteName);
	// 			initialStackNavigatorState.current[initialTabRouteName].forEach((route) =>
	// 				navigation.navigate(route.name, route.params)
	// 			);
	// 		}
	// 	})();
	// }, [navigation]);

	const handlePress = React.useCallback(
		(routeKey, routeName, isFocused) => {
			const event = navigation.emit({
				type: 'tabPress',
				target: routeKey,
			});

			if (!isFocused && !event.defaultPrevented) {
				navigation.navigate(routeName);
				AsyncStorage.setItem('TAB_ROUTE_NAME', routeName);
			}
		},
		[navigation]
	);

	return (
		<FooterWrapper height={footerHeight}>
			<BlurView />
			<FooterContent marginBottom={bottomInsets} height={footerHeight - bottomInsets}>
				{state.routes.map((route, index) => {
					const iconName = tabs[index].icon;
					const label = route.name;
					const isFocused = state.index === index;

					return (
						<TabIconWrapper
							onPress={() => handlePress(route.key, route.name, isFocused)}
							onPressAction={handlePress}
							key={`${iconName}+${index}`}
						>
							<Icon
								size="3.25rem"
								id={route.key}
								name={iconName}
								color={isFocused ? 'neutral0' : 'neutral3'}
								notClickable
							/>
							<Paragraph size="s" margin="0.5rem 0 0 0" color={isFocused ? 'neutral0' : 'neutral3'}>
								{label}
							</Paragraph>
						</TabIconWrapper>
					);
				})}
			</FooterContent>
		</FooterWrapper>
	);
};

export default MyTabBar;
