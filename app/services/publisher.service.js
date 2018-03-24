const { pipe, split, last, not, isEmpty, filter } = require("ramda");
const { client: comicVineClient } = require("../../lib/comic-vine");

module.exports = {
  async search(params) {
    const res = await comicVineClient({
      path: "/publishers/",
      query: {
        limit: 1,
        ...params
      }
    });
    return res.body.results[0];
  },
  async getByApiUrl(url, { project } = {}) {
    const id = pipe(split("/"), filter(item => not(isEmpty(item))), last)(url);
    const res = await comicVineClient({
      path: `/publisher/${id}`,
      query: {
        project
      }
    });
    return res.body.results;
  }
};
