//@format
//@flow

import React from 'react';
import styled from 'styled-components';
import {Text} from 'react-native'; // TODO: replace
import Screen from '../components/Screen';

const StyledScreen = styled(Screen)`
  justify-content: center;
`;

const PlaceHolderScreen = (): JSX.Element => {
  return (
    <StyledScreen>
      <Text>PlaceHolderScreen</Text>
    </StyledScreen>
  );
};

export default PlaceHolderScreen;
