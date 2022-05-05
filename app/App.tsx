import React from 'react';
import { ApolloProvider } from 'react-apollo';

import client from './src/utils/client';
import ThemeProvider from './src/components/ThemeProvider';
import Navigator from './src/screens/Navigator';

// To see all the requests in the chrome Dev tools in the network tab.
if (__DEV__) {
	global.XMLHttpRequest = global.originalXMLHttpRequest || global.XMLHttpRequest;
	global.FormData = global.originalFormData || global.FormData;
	if (window.__FETCH_SUPPORT__) {
		window.__FETCH_SUPPORT__.blob = false;
	} else {
		global.Blob = global.originalBlob || global.Blob;
		global.FileReader = global.originalFileReader || global.FileReader;
	}
}

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
