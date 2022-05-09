import { gql } from 'apollo-server-core';

const PharmaceuticalTypeDefs = gql`
	extend type Query {
		pharmaceutical: Pharmaceutical
		pharmaceuticals: [Pharmaceutical!]!
	}
	type Pharmaceutical {
		id: ID!
		createdAt: String!
		updatedAt: String!
		pzn: String!
		title: String!
		image: String!
		infoText: String!
		priceInCents: String!
		applicationArea: ApplicationArea!
		dosageForm: String!
		applicationInterval: String!
		applicationDuration: String!
		manufacturer: String!
		amount: String!
	}
	enum ApplicationArea {
		FOOT_FUNGUS
		NAIL_FUNGUS
	}
`;

export default PharmaceuticalTypeDefs;
