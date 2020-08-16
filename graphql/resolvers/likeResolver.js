const { UserInputError } = require("apollo-server");

const Post = require("../../models/post");
const { checkAuth } = require("../../util");

const likeResolver = {
  Mutation: {
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        if (!post.likes.find((like) => like.username === username)) {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        } else {
          post.likes = post.likes.filter((like) => like.username !== username);
        }

        await post.save();
        return post;
      } else {
        throw new UserInputError("Post Not Found with ID");
      }
    },
  },
};

module.exports = likeResolver;
