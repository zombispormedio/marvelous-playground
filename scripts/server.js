require("dotenv").config();

require("../app").listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
