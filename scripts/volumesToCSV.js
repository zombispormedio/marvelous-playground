require("dotenv").config();
const fs = require("fs");
const { client: comicVineClient } = require("../lib/comic-vine");
const { timeout } = require("../lib/utils");
const {
  data: { publisher: { volumes } }
} = require("../datasets/volumes.json");

const cleanVolumes = volumes.filter(({ name }) => {
  return !/(\(.+\))|Edition|Collection|Comic Book|Comics|Free Comic Book Day/.test(
    name
  );
});

const lenVolumes = cleanVolumes.length;
const redundancy = {};
for (let index = 0; index < lenVolumes; index++) {
  const item = cleanVolumes[index];
  const inBuffer = redundancy[item.name] || [];
  inBuffer.push(item);
  redundancy[item.name] = inBuffer;
}

const pure = [];
const conflicted = [];
for (let group of Object.values(redundancy)) {
  if (group.length === 1) {
    pure.push(group[0]);
  } else {
    conflicted.push(group);
  }
}

console.log(`${pure.length} pure volumes`);

console.log(`${conflicted.length} conflicted volumes`);

const writter = fs.createWriteStream("datasets/volumes.csv");

for (let { id, name } of pure) {
  writter.write(`"${id}","${id}","${name}"\n`);
}

const lenConflict = conflicted.length;
(async () => {
  for (let i = 0; i < lenConflict; i++) {
    const elems = conflicted[i];
    const [first] = elems;
    const promises = elems.map(async ({ id, ...rest }) => {
      const res = await comicVineClient({
        path: "/issues/",
        query: {
          sort: {
            cover_date: "desc"
          },
          limit: 1,
          filter: {
            volume: id
          },
          project: ["cover_date"]
        }
      });

      return {
        id,
        ...rest,
        cover_date: (res.body.results[0] || {}).cover_date
      };
    });

    const results = await Promise.all(promises);
    const verifiedResults = results
      .filter(({ cover_date }) => cover_date !== undefined)
      .reduce((memo, item) => {
        return {
          ...memo,
          [new Date(item.cover_date).getTime()]: item
        };
      }, {});
    const recent = Math.max(...Object.keys(verifiedResults));
    const { id, name } = verifiedResults[recent];
    writter.write(`"${id}","${id}","${name}"\n`);
    console.log(`${i}-${name}`);
    await timeout(2000);
  }
  writter.end();
})();
