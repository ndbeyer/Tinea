import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

import { Label, Paragraph } from './Text';

const LoadingWrapper = styled.View`
	position: absolute;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

const Wrapper = styled.TouchableOpacity`
	background-color: ${(p) => p.theme.colors[p.backgroundColor.replace('$', '')]};
	border-width: ${(p) => (p.outline ? 1 : 0)}px;
	border-style: solid;
	border-color: ${(p) => p.theme.colors.neutral4};
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: ${(p) => p.theme.rem2px('1rem')};
	margin: ${(p) => p.theme.rem2px(p.mar)};
`;

const LinkWrapper = styled.TouchableOpacity`
	padding: 0;
	margin: ${(p) => p.theme.rem2px(p.margin)};
`;

const Button = ({
	id,
	onPress,
	label = 'I have no label',
	outline,
	loading,
	disabled,
	textColor = 'accentText0',
	textColorDisabled = 'neutral2',
	backgroundColor = 'accent0',
	light = true,
	margin = '1rem',
	link,
}: {
	key?: string;
	id?: string;
	onPress: (id?: string) => void;
	label: string;
	outline?: boolean;
	loading?: boolean;
	disabled?: boolean;
	textColor?: string;
	textColorDisabled?: string;
	backgroundColor?: string;
	light?: boolean;
	margin?: string;
	link?: boolean;
}): JSX.Element | null => {
	const handlePress = React.useCallback(() => {
		onPress && onPress(id);
	}, [id, onPress]);

	return link ? (
		<LinkWrapper onPress={handlePress} disabled={disabled} margin={margin}>
			<>
				{loading ? (
					<LoadingWrapper>
						<ActivityIndicator />
					</LoadingWrapper>
				) : null}
				<Paragraph>{label}</Paragraph>
			</>
		</LinkWrapper>
	) : (
		<Wrapper
			onPress={handlePress}
			disabled={disabled}
			outline={outline}
			backgroundColor={backgroundColor}
			mar={margin}
		>
			<>
				{loading ? (
					<LoadingWrapper>
						<ActivityIndicator />
					</LoadingWrapper>
				) : null}
				<Label
					light={light}
					color={disabled ? textColorDisabled : loading ? 'transparent' : textColor}
					disabled={disabled || loading}
					m="1rem 2rem"
				>
					{label}
				</Label>
			</>
		</Wrapper>
	);
};

export default Button;
