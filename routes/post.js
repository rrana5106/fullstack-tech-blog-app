// create a new router
const router = require("express").Router();

// import the models
const { Post } = require("../models/index");

const { signToken, authMiddleware } = require("../utils/auth");

// Route to add a new post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, postedBy,categoryId } = req.body;
    const post = await Post.create({ title, content, postedBy,categoryId,userId: req.user.id  });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error adding post" });
  }
});

// Route to get all posts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { categoryId } = req.query;
    const where = categoryId ? { categoryId } : {};
    const posts = await Post.findAll({ where });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving posts", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving post" });
  }
});

// Route to update a post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, postedBy } = req.body;
    const post = await Post.update(
      { title, content, postedBy },
      { where: { id: req.params.id } },
    );
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error updating post" });
  }
});

// Route to delete a post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.destroy({ where: { id: req.params.id } });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error deleting post" });
  }
});

// export the router
module.exports = router;
