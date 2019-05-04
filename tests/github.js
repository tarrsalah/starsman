const graphql = require("graphql.js");
const graph = graphql("https://graphql-pokemon.now.sh/");
const test = require("tape");

test("calling github api", function(t) {
  t.plan(1);
  const query = graph(`{
  pokemon(name: "Pikachu") {
    attacks {
      special {
        name
      }
    }
  }
}`);
  query().then(res => {
    t.skip("query github");
    console.log(res);
  });
});
