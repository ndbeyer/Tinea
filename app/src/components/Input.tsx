import React from 'react';
import styled from 'styled-components/native';

import Box from '../components/Box';

const StyledTextInput = styled.TextInput`
	height: ${(p) => p.theme.rem2px('5rem')};
	border-width: 1px;
	padding: ${(p) => p.theme.rem2px('1rem')};
	border-radius: ${(p) => p.theme.rem2px('1rem')}; ;
`;

const Input = ({
	m,
	p,
	width = '30rem',
	placeholder,
	defaultValue,
	onChange,
}: {
	m?: string;
	p?: string;
	width?: string;
	placeholder?: string;
	defaultValue?: string;
	onChange?: (newValue: string) => void;
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
			<StyledTextInput value={value} onChangeText={handleChange} placeholder={placeholder} />
		</Box>
	);
};

export default Input;
