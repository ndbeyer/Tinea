import React from 'react';
import styled from 'styled-components';
import {Text, SafeAreaView} from 'react-native';
import {Provider as PaperProvider, Button} from 'react-native-paper';

import Screen from './src/components/Screen';
import Navigator from './src/screens/Navigator';

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
};

export default App;
