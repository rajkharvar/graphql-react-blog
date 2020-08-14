const Post = require("../../models/post");
const { checkAuth } = require("../../util");

const postResolver = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);

        if (post) {
          return post;
        } else {
          throw new Error("Post not found with following Id");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserPost(_, { username }) {
      try {
        const posts = await Post.find({ username }).sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { title, description }, context) {
      const user = checkAuth(context);

      const newPost = new Post({
        title,
        description,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();
      return post;
    },
  },
};

module.exports = postResolver;
