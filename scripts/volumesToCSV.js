const fs = require("fs");
const {
  data: { publisher: { volumes } }
} = require("../datasets/volumes.json");

const onlyNames = volumes.map(({ name }) => name);

const volumesSet = new Set(onlyNames);

const writter = fs.createWriteStream("datasets/volumes.csv");

/*
  clean ()
  remove Free Comic Book Day
  >

*/
for (let value of volumesSet) {
  writter.write(`"${value}","${value}"\n`);
}

console.log(`Written ${volumesSet.size} entities`);
writter.end();
