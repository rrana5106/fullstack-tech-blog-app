// create a new router
const app = require("express").Router();

// import the models
const { Post, Category } = require("../models/index");

const { authMiddleware } = require("../utils/auth");

// Route to add a new post (must be logged in; post is owned by the logged-in user)
app.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, postedBy, categoryId } = req.body;
    const post = await Post.create({
      title,
      content,
      postedBy,
      categoryId: categoryId || null,
      userId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts, optionally filtered by category
app.get("/", async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId } : {};

    const posts = await Post.findAll({
      where,
      include: [{ model: Category, as: "category" }],
    });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts" });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    if (!post) {
      return res.status(404).json({ message: "No post found with this id" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving post" });
  }
});

// Route to update a post (only the owner may update it)
app.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "No post found with this id" });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own posts" });
    }

    const { title, content, postedBy, categoryId } = req.body;
    await post.update({ title, content, postedBy, categoryId });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Route to delete a post (only the owner may delete it)
app.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "No post found with this id" });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await post.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// export the router
module.exports = app;
