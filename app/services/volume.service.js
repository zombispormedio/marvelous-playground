const { client: comicVineClient } = require("../../lib/comic-vine");

const orderBy = {
  RECENT: "desc",
  FIRST: "asc"
};

module.exports = {
  async search({ order = "RECENT", ...params }) {
    const res = await comicVineClient({
      path: "/volumes/",
      query: {
        sort: {
          date_last_updated: orderBy[order]
        },
        limit: 1,
        ...params
      }
    });
    return res.body.results[0];
  }
};
