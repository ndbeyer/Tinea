/* eslint-disable promise/prefer-await-to-callbacks */

import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { getToken } from '../utils/user';
// import { localFields } from './localState';

import { API_BASE_URL } from '../consts';
// import Dialog from '../components/Dialog';

const httpLink = new HttpLink({
	uri: API_BASE_URL,
});

const authLink = new ApolloLink((operation, forward) => {
	console.log('token', getToken());
	operation.setContext({ headers: { Authorization: `Bearer ${getToken()}` } });
	return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		graphQLErrors.forEach((error) => {
			// if (DEVELOPMENT) {
			console.log('ErrorLink', error);
			// }
			// if (error?.extensions?.code === 'INTERNAL_SERVER_ERROR') {
			// 	Dialog.render({
			// 		title: 'Unerwarteter Fehler',
			// 		description: 'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktiere den Support.',
			// 	});
			// }
		});
	}
	if (networkError) {
		console.log('networkError: ', networkError);
		// Dialog.render({
		// 	title: 'Netzwerkfehler',
		// 	description: 'Es gibt Probleme mit ihrer Internetverbindung.',
		// });
	}
});

const client = new ApolloClient({
	cache: new InMemoryCache({
		// typePolicies: {
		// 	Query: {
		// 		fields: localFields,
		// 	},
		// },
	}),
	link: from([errorLink, authLink, httpLink]),
	defaultOptions: {
		watchQuery: { errorPolicy: 'all', fetchPolicy: 'cache-first' },
		query: { errorPolicy: 'all', fetchPolicy: 'cache-first' },
		mutate: { errorPolicy: 'all' },
	},
});

export default client;
