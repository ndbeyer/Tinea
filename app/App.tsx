import React from 'react';
import {Provider as PaperProvider, Button} from 'react-native-paper';

import ThemeProvider from './src/components/ThemeProvider';
import Navigator from './src/screens/Navigator';

const App = (): JSX.Element => {
  return (
    <PaperProvider>
      <ThemeProvider>
        <Navigator />
      </ThemeProvider>
    </PaperProvider>
  );
};

export default App;
