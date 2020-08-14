require("dotenv");
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  introspection: true,
  playground: true,
});

mongoose.connect(
  process.env.DB_URL || "mongodb://localhost:27017/zujo-test",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => {
    console.log("🚀  connected to DB ...");
  }
);

server.listen(process.env.PORT || 3000).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
