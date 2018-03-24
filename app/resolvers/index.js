const { combineResolvers } = require("apollo-resolvers");

const volumeResolvers = require("./volume.resolvers");
const publisherResolvers = require("./publisher.resolvers");

module.exports = combineResolvers([volumeResolvers, publisherResolvers]);
