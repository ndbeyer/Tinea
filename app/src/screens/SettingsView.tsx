import React from 'react';

import Button from '../components/Button';
import HeaderScrollView from '../components/HeaderScrollView';
import { logout } from '../utils/user';

const SettingsView = (): JSX.Element => {
	const [loading, setLoading] = React.useState(false);
	const handleLogout = React.useCallback(() => {
		setLoading(true);
		logout();
	}, []);

	return (
		<HeaderScrollView>
			<Button onPress={handleLogout} label="Ausloggen" loading={loading} />
		</HeaderScrollView>
	);
};

export default SettingsView;
