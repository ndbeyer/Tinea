import { gql, useQuery } from '@apollo/client';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

import client from './client';

let cachedJwt: null | string = null;

export const setToken = (jwt: string): void => {
	cachedJwt = jwt;
};

export const getToken = (): string | null => {
	return cachedJwt;
};

export const saveJwtAndFetchUser = async (jwt: string): Promise<void> => {
	await EncryptedStorage.setItem('jwt', jwt);
	cachedJwt = jwt;
};

export const useGetJwtFromStorageAndFetchUser = (): void => {
	React.useEffect(() => {
		(async () => {
			const jwt = await EncryptedStorage.getItem('jwt');
			cachedJwt = jwt;
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

export const logout = async (): Promise<void> => {
	await EncryptedStorage.removeItem('jwt');
	RNRestart.Restart();
};

export const fetchUser = async (): Promise<void> => {
	const fetchUserResult = await client.query({
		query: CURRENT_USER_QUERY,
		fetchPolicy: 'network-only',
	});
	console.log('fetchUserResult: ', fetchUserResult);
};

export const useCurrentUser = (): undefined | null | CurrentUser => {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return React.useMemo(() => data?.currentUser, [data?.currentUser]);
};

type AppState = 'LOGGED_IN' | 'LOGGED_OUT' | 'LOADING';

// we need to use a different currentUser query here (with only the id) and cannot use useCurrentUser directly, otherwise fetchUser,
// which must be called after getting the jwt from secure storage won't run against the api when restarting the app
// this happens in the old (Audioshares) and new apollo implementation (@apollo/client)

export const useAppState = (): AppState => {
	const currentUser = useCurrentUser();
	const appState: AppState = React.useMemo(
		() => (currentUser ? 'LOGGED_IN' : currentUser === null ? 'LOGGED_OUT' : 'LOADING'),
		[currentUser]
	);
	return appState;
};
