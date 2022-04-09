import React from 'react';
import styled from 'styled-components';
import type {Node} from 'react';
import {Text} from 'react-native';
import Screen from './src/components/Screen';
const App = (): JSX.Element => {
  return (
    <Screen>
      <Text>Hello</Text>
    </Screen>
  );
};

export default App;
