import React from 'react';
import styled from 'styled-components/native';

import Box from '../components/Box';

const StyledTextInput = styled.TextInput`
	height: ${(p) => p.theme.rem2px('5rem')};
	border-width: 1px;
	border-color: ${(p) => p.theme.colors.border0};
	padding: ${(p) => p.theme.rem2px('1rem')};
	border-radius: ${(p) => p.theme.rem2px('1rem')};
	background-color: ${(p) => p.theme.colors.background0};
	width: 100%;
`;

const Input = ({
	m,
	p,
	width = '30rem',
	placeholder,
	defaultValue,
	onChange,
	disabled,
	password,
}: {
	m?: string;
	p?: string;
	width?: string;
	placeholder?: string;
	defaultValue?: string;
	disabled?: boolean;
	onChange?: (newValue: string) => void;
	password?: boolean;
}): JSX.Element => {
	const [value, setValue] = React.useState(defaultValue || '');
	const handleChange = React.useCallback(
		(newValue: string) => {
			setValue(newValue);
			onChange?.(newValue);
		},
		[onChange]
	);
	return (
		<Box m={m} p={p} width={width}>
			<StyledTextInput
				value={value}
				onChangeText={handleChange}
				placeholder={placeholder}
				editable={disabled ? false : true}
				secureTextEntry={password}
				autoCapitalize="none"
				autoCorrect={false}
			/>
		</Box>
	);
};

export default Input;
