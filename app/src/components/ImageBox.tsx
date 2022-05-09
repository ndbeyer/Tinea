import * as React from 'react';
import styled from 'styled-components/native';

import Box, { BoxProps } from './Box';

const StyledImage = styled.Image`
	width: 100%;
	height: 100%;
`;

interface ImageBoxProps extends BoxProps {
	source?: string;
}

const ImageBox = ({ source, ...rest }: ImageBoxProps) => {
	// eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
	return <Box {...rest}>{source ? <StyledImage source={{ uri: source }} /> : null}</Box>;
};

export default React.memo(ImageBox);
