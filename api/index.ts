import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import express from "express";
import http from "http";

import CONSTS from "./consts";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import initializeDb from "./utils/initializeDb";
import { createViewerFromJwt } from "./utils/authHelpers";

import type { Context } from "./typescript-types";

const createContext = ({ req }): Context => {
  const autHeader = req.header("authorization") as string;
  const jwtToken =
    autHeader && autHeader.includes("Bearer ")
      ? autHeader.replace("Bearer ", "")
      : undefined;
  const viewer = createViewerFromJwt(jwtToken);
  return {
    viewer,
  };
};

(async () => {
  await initializeDb();
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: createContext,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
  // @ts-ignore
  await new Promise((resolve) =>
    httpServer.listen({ port: CONSTS.PORT }, resolve as () => void)
  );
  console.log(
    `>>> 🚀 Server ready at ${CONSTS.API_BASE_URL}${server.graphqlPath}`
  );
})();
