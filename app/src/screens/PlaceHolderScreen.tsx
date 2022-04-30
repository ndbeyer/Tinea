import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '../components/Text';
import Button from '../components/Button';
import HeaderScrollView from '../components/HeaderScrollView';

const PlaceHolderScreen = ({ navigation }): JSX.Element => {
	const handleNavigate = React.useCallback(() => {
		navigation.navigate('Test');
	}, [navigation]);

	return (
		<HeaderScrollView>
			<Button onPress={handleNavigate} label="click me" />
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
			<Paragraph>PlaceHolderScreen</Paragraph>
		</HeaderScrollView>
	);
};

export default PlaceHolderScreen;
