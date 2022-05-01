import React from 'react';
import { ApolloProvider } from '@apollo/client';

import client from './src/utils/client';
import ThemeProvider from './src/components/ThemeProvider';
import Navigator from './src/screens/Navigator';

const App = (): JSX.Element => {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
				<Navigator />
			</ThemeProvider>
		</ApolloProvider>
	);
};

export default App;
