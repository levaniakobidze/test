const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const postSchema = new mongoose.Schema({
  img: String,
  title: String,
  body: String,
  views: Number,
});
const Posts = mongoose.model("Posts", postSchema);

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
};
const getPostById = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error retrieving post" });
  }
};

const createPost = async (req, res) => {
  try {
    const post = new Posts(req.body);
    const newPost = await post.save();
    res.json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Error creating post" });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Posts.findByIdAndDelete(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting Post" });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
