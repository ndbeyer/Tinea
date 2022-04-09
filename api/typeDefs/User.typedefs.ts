import { gql } from "apollo-server-core";

const UserTypeDefs = gql`
  extend type Query {
    user(id: ID!): User
    users(ids: [ID!]): [User!]!
    currentUser: User
  }
  extend type Mutation {
    register(
      email: String!
      password: String!
      termsAccepted: Boolean!
    ): AuthResponse
    confirmEmailByLink(linkConfirmationCode: String!): AuthResponse
    confirmEmailByNumber(
      numberConfirmationCode: String!
      emailAddress: String!
    ): AuthResponse
    login(email: String!, password: String!): AuthResponse
  }
  type User {
    id: ID!
    email: String!
    createdAt: String!
    roles: [Role!]!
  }
  type AuthResponse {
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
  enum Role {
    ROOT
    ADMIN
    USER
  }
`;

export default UserTypeDefs;
