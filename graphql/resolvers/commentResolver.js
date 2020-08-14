const { UserInputError } = require("apollo-server");

const Post = require("../../models/post");
const { checkAuth } = require("../../util");

const commentsResolver = {
  Mutation: {
    async createComment(_, { postId, text }, context) {
      const { username } = checkAuth(context);

      if (text === "") {
        throw new UserInputError("Text must not be empty");
      }

      const post = await Post.findById(postId);

      if (post) {
        post.comments.unshift({
          text,
          username,
          createdAt: new Date().toISOString(),
        });

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post Not Found with ID");
      }
    },
  },
};

module.exports = commentsResolver;
