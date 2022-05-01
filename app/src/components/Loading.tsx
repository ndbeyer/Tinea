import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled, { useTheme } from 'styled-components/native';

const Wrapper = styled.View<{ $height?: number }>`
	height: ${(p) => (p.height ? p.height + 'px' : '100%')};
	width: 100%;
	justify-content: center;
	align-items: center;
`;

const Loading = ({ height }: { height?: number }): JSX.Element => {
	const theme = useTheme();
	return (
		<Wrapper $height={height}>
			<ActivityIndicator color={theme.colors.neutral0} />
		</Wrapper>
	);
};

export default Loading;
