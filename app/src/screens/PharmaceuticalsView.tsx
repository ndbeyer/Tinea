import React from 'react';

import Box from '../components/Box';
import { Label, Paragraph } from '../components/Text';
import HeaderScrollView from '../components/HeaderScrollView';
import ImageBox from '../components/ImageBox';
import { useAllPharmaceuticals } from '../utils/pharmaceutical';

const PharmaceuticalTile = ({
	id,
	pzn,
	title,
	image,
	infoText,
	priceInCents,
	applicationArea,
	dosageForm,
	applicationInterval,
	applicationDuration,
	manufacturer,
	amount,
}: {
	id: string;
	createdAt: string;
	updatedAt: string;
	pzn: string;
	title: string;
	image: string;
	infoText: string;
	priceInCents: string;
	applicationArea: 'FOOT_FUNGUS' | 'NAIL_FUNGUS';
	dosageForm: string;
	applicationInterval: string;
	applicationDuration: string;
	manufacturer: string;
	amount: string;
}) => {
	return (
		<Box
			alignSelf="stretch"
			m="0 0 1rem 0"
			elevation={1}
			bg="background0"
			borderRadius="1rem"
			p="2rem"
		>
			<ImageBox source={image} width="10rem" height="10rem" />
			<Label>{title}</Label>
			<Paragraph>{pzn}</Paragraph>
			<Paragraph>{manufacturer}</Paragraph>
			<Paragraph>{priceInCents}</Paragraph>
			<Paragraph>{dosageForm}</Paragraph>
			<Paragraph>{applicationArea === 'FOOT_FUNGUS' ? 'Fußpilz' : 'Nagelpilz'}</Paragraph>
			<Paragraph>{applicationInterval}</Paragraph>
			<Paragraph>{applicationDuration}</Paragraph>
			<Paragraph>{amount}</Paragraph>
		</Box>
	);
};

const PharmaceuticalsView = (): JSX.Element => {
	const allPharmaceuticals = useAllPharmaceuticals();
	console.log('allPharmaceuticals: ', allPharmaceuticals);

	return !allPharmaceuticals ? (
		<HeaderScrollView loading />
	) : (
		<HeaderScrollView>
			<Box p="1rem 1rem 0" alignSelf="stretch">
				{allPharmaceuticals.map((pharmaceutical) => (
					<PharmaceuticalTile key={pharmaceutical.id} {...pharmaceutical} />
				))}
			</Box>
		</HeaderScrollView>
	);
};

export default PharmaceuticalsView;
