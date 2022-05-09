import { gql } from 'apollo-server-core';

import UserTypeDefs from './User.typedefs';
import PharmaceuticalTypeDefs from './Pharmaceutical.typedefs';

const globalScheme = gql`
	type Query {
		bla(bla: String): String
	}
	type Mutation {
		bla(bla: String!): String
	}
`;

const typeDefs = [globalScheme, UserTypeDefs, PharmaceuticalTypeDefs];

export default typeDefs;
