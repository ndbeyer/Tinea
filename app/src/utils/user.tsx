import { gql, useQuery } from '@apollo/client';
import React from 'react';
import client from './client';

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
	await client.query({
		query: CURRENT_USER_QUERY,
	});
};

export const useCurrentUser = (): undefined | null | CurrentUser => {
	const { data, error, loading } = useQuery(CURRENT_USER_QUERY, {
		fetchPolicy: 'cache-and-network',
	});
	return React.useMemo(() => data?.currentUser, []);
};

type AppState = 'LOGGED_IN' | 'LOGGED_OUT' | 'LOADING';

export const useAppState = () => {
	const currentUser = useCurrentUser();
	const appState: AppState = React.useMemo(
		() => (currentUser ? 'LOGGED_IN' : currentUser === null ? 'LOGGED_OUT' : 'LOADING'),
		[currentUser]
	);
	return appState;
};
