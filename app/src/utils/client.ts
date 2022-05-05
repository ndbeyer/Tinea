/* eslint-disable promise/prefer-await-to-callbacks */

import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ErrorLink } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { getToken } from '../utils/user';

import { API_BASE_URL } from '../consts';

const httpLink = new HttpLink({
	uri: API_BASE_URL,
});

const authLink = new ApolloLink((operation, forward) => {
	console.log('token', getToken());
	operation.setContext({ headers: { Authorization: `Bearer ${getToken()}` } });
	return forward(operation);
});

const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
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

const link = ApolloLink.from([
	authLink,
	errorLink,
	httpLink,
]);

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link,
	defaultOptions: {
		watchQuery: { errorPolicy: 'all', fetchPolicy: 'cache-first' },
		query: { errorPolicy: 'all', fetchPolicy: 'cache-first' },
		mutate: { errorPolicy: 'all' },
	},
});

export default client;
