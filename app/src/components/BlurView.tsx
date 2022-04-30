import React from 'react';
import styled from 'styled-components/native';

// TODO: implement BlurView
// import { BlurView as ExpoBlurView } from 'expo-blur';

// const StyledBlurView = styled(ExpoBlurView).attrs((p) => ({
// 	intensity: p.theme.darkMode ? 50 : 100,
// }))`
// 	position: absolute;
// 	width: 100%;
// 	height: 100%;
// `;

const StyledBlurView = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
`;

const Opaciter = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: ${(p) => (p.theme.darkMode ? 'black' : p.theme.colors.background0)};
	/* opacity: ${(p) => (p.theme.darkMode ? '0.9' : '0.5')}; */
	opacity: 0.9;
`;

const BlurView = (): JSX.Element => {
	return (
		<>
			<Opaciter />
			<StyledBlurView />
		</>
	);
};

export default BlurView;
