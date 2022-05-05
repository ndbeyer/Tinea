import { useQuery } from 'react-apollo';
import { gql } from 'graphql-tag';
import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import RNRestart from 'react-native-restart';

import client from './client';
import refreshLogin from '../utils/mutations/refreshLogin';

let cachedJwt: null | string = null;

export const setJwt = (jwt: string): void => {
	cachedJwt = jwt;
};

export const getJwt = (): string | null => {
	return cachedJwt;
};

export const saveTokensAndFetchUser = async ({
	jwt,
	refreshToken,
}: {
	jwt: string;
	refreshToken?: string;
}): Promise<void> => {
	if (refreshToken) {
		await EncryptedStorage.setItem('refreshToken', refreshToken);
	}
	setJwt(jwt);
	await fetchUser();
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
	await EncryptedStorage.removeItem('refreshToken');
	RNRestart.Restart();
};

export const fetchUser = async (): Promise<void> => {
	await client.query({
		query: CURRENT_USER_QUERY,
		fetchPolicy: 'network-only',
	});
};

export const useCurrentUser = (): undefined | null | CurrentUser => {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return React.useMemo(() => data?.currentUser, [data?.currentUser]);
};

type AppState = 'LOGGED_IN' | 'LOGGED_OUT' | 'LOADING';

export const useAppState = (): AppState => {
	const currentUser = useCurrentUser();
	const [triedRefresh, setTriedRefresh] = React.useState(false);

	React.useEffect(() => {
		(async () => {
			const refreshToken = await EncryptedStorage.getItem('refreshToken');
			if (refreshToken) {
				const { success, jwt } = await refreshLogin({ refreshToken });
				if (success) {
					await saveTokensAndFetchUser({ jwt });
				}
			}
			setTriedRefresh(true);
		})();
	}, []);

	const appState: AppState = React.useMemo(
		() =>
			!triedRefresh || currentUser === undefined
				? 'LOADING'
				: currentUser === null
				? 'LOGGED_OUT'
				: 'LOGGED_IN',
		[currentUser, triedRefresh]
	);
	return appState;
};
