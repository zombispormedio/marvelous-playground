const { getSelectedFields } = require("../../lib/graphql-utils");
const { publisherService } = require("../services");

const resolvers = {
  Query: {}
};

resolvers.Query.publisher = async (parent, { name }, context, info) => {
  const project = getSelectedFields(info);
  const previewPublisher = await publisherService.search({
    filter: { name },
    field_list: ["api_detail_url"]
  });

  return publisherService.getByApiUrl(previewPublisher.api_detail_url, {
    project
  });
};

module.exports = resolvers;
