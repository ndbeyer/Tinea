import React from 'react';
import { useQuery } from 'react-apollo';
import { gql } from 'graphql-tag';

export type Pharmaceutical = {
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
};

export const PharmaceuticalDetailFragment = gql`
	fragment PharmaceuticalDetailFragment on Pharmaceutical {
		id
		createdAt
		updatedAt
		pzn
		title
		image
		infoText
		priceInCents
		applicationArea
		dosageForm
		applicationInterval
		applicationDuration
		manufacturer
		amount
	}
`;

export const useAllPharmaceuticals = (): undefined | null | Pharmaceutical[] => {
	const { data } = useQuery(gql`
		query Pharmaceuticals {
			pharmaceuticals {
				...PharmaceuticalDetailFragment
			}
		}
		${PharmaceuticalDetailFragment}
	`);
	return React.useMemo(() => data?.pharmaceuticals, [data?.pharmaceuticals]);
};
