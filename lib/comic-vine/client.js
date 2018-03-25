const got = require("got");
const urljoin = require("url-join");
const querystring = require("querystring");
const COMIC_VINE_URL = "https://comicvine.gamespot.com/api/";
const COMIC_VINE_TOKEN = process.env.COMIC_VINE_TOKEN;

const serializeParams = (key, params) =>
  params
    ? {
        [key]: Object.entries(params)
          .map(([key, value]) => `${key}:${value}`)
          .join(",")
      }
    : undefined;

const getFieldList = project =>
  project
    ? {
        field_list: project.join(",")
      }
    : undefined;

module.exports = async ({
  path,
  query: { filter, sort, project, ...rest } = {}
}) => {
  const serializedFilter = serializeParams("filter", filter);
  const serializedSort = serializeParams("sort", sort);
  const fieldList = getFieldList(project);
  const queryWithAuth = {
    api_key: COMIC_VINE_TOKEN,
    format: "json",
    ...(serializedFilter || {}),
    ...(serializedSort || {}),
    ...(fieldList || {}),
    ...rest
  };
  const requestUrl = urljoin(
    COMIC_VINE_URL,
    path,
    `?${querystring.stringify(queryWithAuth)}`
  );
  console.log(requestUrl);
  return got(requestUrl, { json: true });
};
