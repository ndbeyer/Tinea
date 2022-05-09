import React from 'react';
import styled from 'styled-components/native';
import { View, ViewStyle } from 'react-native';

const Wrapper = styled(View)`
	margin: ${(p) => p.theme.rem2px(p.m) || '0px'};
	padding: ${(p) => p.theme.rem2px(p.p) || '0px'};
	width: ${(p) => p.theme.rem2px(p.width) || 'auto'};
	height: ${(p) => p.theme.rem2px(p.height) || 'auto'};
	flex-direction: ${(p) => (p.row ? 'row' : 'column')};
	border-radius: ${(p) => p.theme.rem2px(p.borderRadius) || '0px'};
	border: ${(p) => p.border || '0px solid transparent'};
	justify-content: ${(p) => p.justifyContent || 'flex-start'};
	align-items: ${(p) => p.alignItems || 'flex-start'};
	background-color: ${(p) => p.theme.colors[p.bg] || 'auto'};
	align-self: ${(p) => p.alignSelf || 'auto'};
`;

export type BoxProps = {
	m?: string;
	p?: string;
	height?: string;
	width?: string;
	row?: boolean;
	borderRadius?: string;
	border?: string;
	justifyContent?: 'flex-start' | 'flex-end' | 'center';
	alignItems?: 'flex-start' | 'flex-end' | 'center';
	elevation?: number;
	bg?: string;
	alignSelf?: 'stretch';
	children?: JSX.Element | null | (JSX.Element | null)[];
	style?: ViewStyle;
};

const Box = ({
	m,
	p,
	height,
	width,
	row,
	borderRadius,
	border,
	justifyContent,
	alignItems,
	elevation,
	bg,
	alignSelf,
	children,
	style,
}: BoxProps): JSX.Element => {
	const shadowStyle = React.useMemo(
		() =>
			elevation
				? {
						shadowColor: 'black',
						shadowOffset: { width: 0, height: elevation },
						shadowRadius: elevation * 2.5,
						shadowOpacity: 0.3,
						elevation: elevation,
						zIndex: elevation,
				  }
				: {},
		[elevation]
	);

	return (
		<Wrapper
			m={m}
			p={p}
			height={height}
			width={width}
			row={row}
			borderRadius={borderRadius}
			justifyContent={justifyContent}
			alignItems={alignItems}
			border={border}
			bg={bg}
			alignSelf={alignSelf}
			{...shadowStyle}
			style={style}
		>
			<>{children}</>
		</Wrapper>
	);
};

export default Box;
