import React from 'react';

import ThemeProvider from './src/components/ThemeProvider';
import Navigator from './src/screens/Navigator';

const App = (): JSX.Element => {
	return (
		<ThemeProvider>
			<Navigator />
		</ThemeProvider>
	);
};

export default App;
