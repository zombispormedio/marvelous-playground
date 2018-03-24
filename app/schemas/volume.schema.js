module.exports = `
  type Volume {
    id: ID!
    name: String
    api_detail_url: String
    date_added: String
    date_last_updated: String 
    last_issue: Issue
    image: Any
  }

  extend type Query { 
    volume(name: String!, order: OrderOptions = RECENT): Volume
  }
`;
