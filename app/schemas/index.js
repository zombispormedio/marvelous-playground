const volumeSchema = require("./volume.schema");
const issueSchema = require("./issue.schema");
const publisherSchema = require("./publisher.schema");

const supportSchema = `
 enum OrderOptions {
    RECENT
    FIRST
  }
`;

module.exports = [supportSchema, volumeSchema, issueSchema, publisherSchema];
