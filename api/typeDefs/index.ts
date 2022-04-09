import { gql } from "apollo-server-core";

import UserTypeDefs from "./User.typedefs";

const globalScheme = gql`
  type Query {
    bla(bla: String): String
  }
  type Mutation {
    bla(bla: String!): String
  }
`;

const typeDefs = [globalScheme, UserTypeDefs];

export default typeDefs;
