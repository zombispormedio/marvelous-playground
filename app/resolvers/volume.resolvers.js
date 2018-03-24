const { getSelectedFields } = require("../../lib/graphql-utils");
const { volumeService } = require("../services");

const resolvers = {
  Query: {}
};

resolvers.Query.volume = (parent, { name, order }, context, info) => {
  const project = getSelectedFields(info);
  return volumeService.search({
    filter: { name },
    project,
    order
  });
};

module.exports = resolvers;
