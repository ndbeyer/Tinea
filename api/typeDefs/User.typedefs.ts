import { gql } from 'apollo-server-core';

const UserTypeDefs = gql`
	extend type Query {
		currentUser: User
	}
	extend type Mutation {
		register(email: String!, password: String!, termsAccepted: Boolean): AuthResponse
		confirmEmail(confirmationCode: String!, emailAddress: String!): AuthResponse
		login(email: String!, password: String!): AuthResponse
	}
	type User {
		id: ID!
		email: String!
		createdAt: String!
	}
	type AuthResponse {
		user: User
		success: Boolean!
		jwt: String
	}
	enum VerificationType {
		LINK
		NUMBER
	}
	enum UserType {
		TEACHER
		PUPIL
	}
`;

export default UserTypeDefs;
