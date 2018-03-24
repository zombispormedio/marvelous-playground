module.exports = `
  type Publisher {
    api_detail_url: String
    id: ID!
    name: String 
    volumes: [Volume]
  }

  extend type Query { 
    publisher(name: String!): Publisher
  }
`;
