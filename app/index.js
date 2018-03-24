const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const GraphQLJSON = require("graphql-type-json");
const { combineResolvers } = require("apollo-resolvers");

const schemas = require("./schemas");
const resolvers = require("./resolvers");

const defaultTypedefs = `
  scalar Any 
  type Query
`;

const defaultResolvers = {
  Any: GraphQLJSON
};

const schema = makeExecutableSchema({
  typeDefs: [defaultTypedefs, ...schemas],
  resolvers: combineResolvers([defaultResolvers, resolvers])
});

const app = express();

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

module.exports = app;
