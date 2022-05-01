import { AuthenticationError } from "apollo-server-express";

import type { Context } from "./typescript-types";

import User from "./classes/User";

import login from "./mutations/login";
import register from "./mutations/register";
import confirmEmailByNumber from "./mutations/confirmEmailByNumber";

const ensureAdminUser = (context: Context) => {
  if (!context.viewer.isAdmin) {
    throw new AuthenticationError("UNAUTHENTICATED");
  }
};

const resolvers = {
  Query: {
    // adminRoutes
    user: async (_, { id }, context: Context) => {
      ensureAdminUser(context);
      return await User.gen({ id });
    },
    users: async (_, { ids }, context: Context) => {
      ensureAdminUser(context);
      return await User.genMult({ ids });
    },
    // non-adminRoutes
    currentUser: async (_, __, context) => {
      // TODO:
      return {
        id: 1,
        email: "bla",
      };
      return await User.gen({ id: context.viewer.userId });
    },
  },
  Mutation: {
    login,
    register,
    confirmEmailByNumber,
  },
};

export default resolvers;
