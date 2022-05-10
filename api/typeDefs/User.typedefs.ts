import { gql } from 'apollo-server-core';

const UserTypeDefs = gql`
	extend type Query {
		currentUser: User
	}
	extend type Mutation {
		register(email: String!, password: String!, termsAccepted: Boolean): SuccessResponse
		confirmEmail(confirmationCode: String!, emailAddress: String!): AuthResponse
		login(email: String!, password: String!): AuthResponse
		refreshLogin(refreshToken: String!): RefreshLoginResponse
		updateUserStatus(status: UserStatus!): SuccessResponse
	}
	type User {
		id: ID!
		email: String!
		createdAt: String!
		status: UserStatus!
	}
	type SuccessResponse {
		success: Boolean!
	}
	type RefreshLoginResponse {
		success: Boolean!
		jwt: String!
	}
	type AuthResponse {
		success: Boolean!
		jwt: String!
		refreshToken: String!
	}
	enum UserStatus {
		INITIAL
		QUESTIONAIRE
		FINISHED_QUESTIONAIRE
		ORDERED_PRODUCT
		HAS_PRODUCT
	}
`;

export default UserTypeDefs;
