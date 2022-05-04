import { gql, useQuery } from '@apollo/client';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';

import client from './client';

let cachedJwt: null | string = null;

export const setToken = (jwt: string): void => {
	cachedJwt = jwt;
};

export const getToken = (): string | null => {
	return cachedJwt;
};

export const useGetJwtFromStorage = (): void => {
	React.useEffect(() => {
		(async () => {
			const jwt = await EncryptedStorage.getItem('jwt');
			console.log('useGetJwtFromStorage', jwt);
			cachedJwt = jwt;

			console.log('cachedJwt', cachedJwt);
			await fetchUser();
		})();
	}, []);
};

type CurrentUser = {
	id: string;
	email: string;
};

export const CURRENT_USER_QUERY = gql`
	query CurrentUser {
		currentUser {
			id
			email
		}
	}
`;

export const fetchUser = async (): Promise<void> => {
	const result = await client.query({
		query: CURRENT_USER_QUERY,
		fetchPolicy: 'cache-first',
	});
	console.log('fetch user result: ', result);
};

export const useCurrentUser = (): undefined | null | CurrentUser => {
	const { data } = useQuery(CURRENT_USER_QUERY, {
		fetchPolicy: 'cache-and-network',
	});
	return React.useMemo(() => data?.currentUser, [data?.currentUser]);
};

type AppState = 'LOGGED_IN' | 'LOGGED_OUT' | 'LOADING';

export const useAppState = (): AppState => {
	const currentUser = useCurrentUser();
	const appState: AppState = React.useMemo(
		() => (currentUser ? 'LOGGED_IN' : currentUser === null ? 'LOGGED_OUT' : 'LOADING'),
		[currentUser]
	);
	return appState;
};
