import React from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';

const Wrapper = styled(View)`
	margin: ${(p) => p.theme.rem2px(p.m) || '0px'};
	padding: ${(p) => p.theme.rem2px(p.p) || '0px'};
	width: ${(p) => p.theme.rem2px(p.width) || 'auto'};
	height: ${(p) => p.theme.rem2px(p.height) || 'auto'};
	flex-direction: ${(p) => (p.row ? 'row' : 'column')};
	border-radius: ${(p) => p.theme.rem2px(p.borderRadius) || '0px'};
`;

const Box = ({
	m,
	p,
	height,
	width,
	row,
	borderRadius,
	children,
}: {
	m?: string;
	p?: string;
	height?: string;
	width?: string;
	row?: boolean;
	borderRadius?: string;
	children?: JSX.Element | null | (JSX.Element | null)[];
}): JSX.Element => {
	return (
		<Wrapper m={m} p={p} height={height} width={width} row={row} borderRadius={borderRadius}>
			<>{children}</>
		</Wrapper>
	);
};

export default Box;
