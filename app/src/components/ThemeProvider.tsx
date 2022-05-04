import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components/native';
import { times } from 'lodash';
import { UNIT, typoDefs, pathDefs } from '../utils/theme';
import createColorScheme from '../utils/createColorScheme';
import PortalProvider from './PortalProvider';

const rem2px = (input: string, output: 'string' | 'number' = 'string') => {
	if (input) {
		if (typeof input === 'number') {
			return input;
		} else if (typeof input === 'string') {
			if (input.includes('%') || input.includes('px')) {
				return input;
			} else if (input.includes('rem')) {
				const numberArray = input.split(' ').map((str) => Number(str.replace('rem', '')));
				return output === 'string'
					? numberArray.reduce((a, b) => `${a} ${b * UNIT}px`, '')
					: numberArray.length === 1
					? numberArray[0] * UNIT
					: numberArray.map((n) => n * UNIT);
			} else {
				return '0';
			}
		} else {
			return '0';
		}
	} else {
		return undefined;
	}
};

const rem24sidesPx = (string: string, type: 'pxString' | 'pxArray' = 'pxString') => {
	const array = [];
	// TODO: ignore
	// @ts-ignore
	string.split(' ').forEach((str) => array.push(Number(str.replace('rem', ''))));
	if (array.length === 1) {
		times(3).forEach((_) => array.push(array[0]));
	} else if (array.length === 2) {
		array.push(array[0]);
		array.push(array[1]);
	} else if (array.length === 3) {
		array.push(array[1]);
	} else {
		// do nothing
	}
	return type === 'pxString'
		? array.reduce((a, b) => `${a} ${b * UNIT}px`, '')
		: array.map((n) => n * UNIT);
};

const ThemeProvider = ({ children }: { children?: JSX.Element }): JSX.Element => {
	const [darkMode, setDarkMode] = React.useState(false);

	const theme = React.useMemo(
		() => ({
			rem: UNIT,
			iconPaths: pathDefs(),
			colors: createColorScheme({
				accentColor: '#7FFFD4',
				darkMode,
				tintStrength: 3,
			}),
			typo: { ...typoDefs() },
			rem2px,
			rem24sidesPx,
			setDarkMode,
			darkMode,
		}),
		[darkMode]
	);

	console.log('theme', theme);

	return (
		<StyledComponentsThemeProvider theme={theme}>
			<StatusBar barStyle={!darkMode ? 'dark-content' : 'light-content'} />
			<PortalProvider>{children}</PortalProvider>
		</StyledComponentsThemeProvider>
	);
};

export default ThemeProvider;
