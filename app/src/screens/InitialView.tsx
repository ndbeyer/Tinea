/* */

import React from 'react';
import styled from 'styled-components/native';

import HeaderScrollView from '../components/HeaderScrollView';
import Box from '../components/Box';
import Button from '../components/Button';
import { Label, Paragraph } from '../components/Text';
import updateUserStatus from '../utils/mutations/updateUserStatus';

const RowWrapper = styled(Box).attrs({
	p: '1rem 1rem 0',
	alignSelf: 'stretch',
})``;

const Card = styled(Box).attrs({
	m: '0 0 1rem 0',
	p: '2rem',
	elevation: 1,
	bg: 'background0',
	borderRadius: '1rem',
	alignSelf: 'stretch',
})``;

type UserStatus =
	| 'INITIAL'
	| 'QUESTIONAIRE'
	| 'FINISHED_QUESTIONAIRE'
	| 'ORDERED_PRODUCT'
	| 'HAS_PRODUCT';

const InitialView = (): JSX.Element => {
	const [loading, setLoading] = React.useState(false);
	const handleUpdateUserStatus = React.useCallback(async (newStatus: UserStatus) => {
		console.log('newStatus: ', newStatus);
		setLoading(true);
		const { success, error } = await updateUserStatus({ status: newStatus });
		console.log('{ success, error }: ', { success, error });
		setLoading(false);
	}, []);

	return (
		<HeaderScrollView>
			<RowWrapper>
				<Card>
					<Label>Wilkommen bei Tinea!</Label>
					<Paragraph m="1rem 0 2rem 0">
						Tinea soll Menschen mit Nagelpilz helfen, indem es sie bei der entsprechenden
						Arzneimitteltherapie unterstützend zur Seite steht. Bitte wählen Sie die für Sie
						zutreffende Aussage.
					</Paragraph>

					<Button
						margin="0 0 2rem 0"
						label="Ich vermute, dass ich Nagelpilz habe."
						onPress={() => handleUpdateUserStatus('QUESTIONAIRE')}
						backgroundColor="none"
						outline
						loading={loading}
					/>
					<Button
						margin="0 0 2rem 0"
						label="Ich weiß, dass ich Nagelpilz habe und brauche ein Arzneimittel, um diesen behandeln."
						onPress={() => handleUpdateUserStatus('FINISHED_QUESTIONAIRE')}
						backgroundColor="none"
						outline
						loading={loading}
					/>
					<Button
						margin="0 0 1rem 0"
						label="Ich weiß, dass ich Nagelpilz habe und habe bereits ein Arzneimittel um diesen
						behandeln."
						onPress={() => handleUpdateUserStatus('HAS_PRODUCT')}
						backgroundColor="none"
						outline
						loading={loading}
					/>
				</Card>
			</RowWrapper>
		</HeaderScrollView>
	);
};

export default InitialView;
