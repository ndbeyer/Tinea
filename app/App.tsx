import React from 'react';
import styled from 'styled-components';
import {Text} from 'react-native';
import Screen from './src/components/Screen';
import {Provider as PaperProvider, Button} from 'react-native-paper';
const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <Screen>
        <Text>Hello</Text>
        <Button icon="camera">Press me</Button>
      </Screen>
    </PaperProvider>
  );
};

export default App;
