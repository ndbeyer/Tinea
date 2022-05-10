/* */

import React from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native'; // TODO: replace
import Screen from '../components/Screen';
import HeaderScrollView from '../components/HeaderScrollView';
import Box from '../components/Box';
import { Label, Paragraph } from '../components/Text';

const Wrapper = styled(Box).attrs({
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

const StyledTouchableOpacity = styled.TouchableOpacity`
	align-self: stretch;
`;

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
		// updateUserStatus
		setLoading(false);
	}, []);

	return (
		<HeaderScrollView>
			<Wrapper>
				<Card>
					<Label>Wilkommen bei Tinea!</Label>
					<Paragraph>
						Tinea soll Menschen mit Nagelpilz helfen, indem es sie bei der entsprechenden
						Arzneimitteltherapie unterstützend zur Seite steht. Bitte wählen Sie die für Sie
						zutreffende Aussage.
					</Paragraph>
				</Card>

				{/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
				<StyledTouchableOpacity onPress={() => handleUpdateUserStatus('QUESTIONAIRE')}>
					<Card>
						<Label>Ich vermute, dass ich Nagelpilz habe.</Label>
					</Card>
				</StyledTouchableOpacity>
				{/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
				<StyledTouchableOpacity onPress={() => handleUpdateUserStatus('FINISHED_QUESTIONAIRE')}>
					<Card>
						<Label>
							Ich weiß, dass ich Nagelpilz habe und brauche ein Arzneimittel, um diesen behandeln.
						</Label>
					</Card>
				</StyledTouchableOpacity>
				{/* eslint-disable-next-line react-perf/jsx-no-new-function-as-prop */}
				<StyledTouchableOpacity onPress={() => handleUpdateUserStatus('HAS_PRODUCT')}>
					<Card>
						<Label>
							Ich weiß, dass ich Nagelpilz habe und habe bereits ein Arzneimittel um diesen
							behandeln.
						</Label>
					</Card>
				</StyledTouchableOpacity>
			</Wrapper>
		</HeaderScrollView>
	);
};

export default InitialView;
