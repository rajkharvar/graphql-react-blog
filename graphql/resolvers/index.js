const userResolver = require("./userResolver");
const postResolver = require("./postResolver");
const commentResolver = require("./commentResolver");
const likeResolver = require("./likeResolver");

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },
  Query: {
    ...postResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...likeResolver.Mutation,
  },
};
