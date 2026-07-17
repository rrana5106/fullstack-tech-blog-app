const router = require("express").Router();
const { User } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

const PUBLIC_ATTRIBUTES = { exclude: ["password"] };

// Get current authenticated user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { attributes: PUBLIC_ATTRIBUTES });
    if (!user) return res.status(401).json({ message: "Token expired" });
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET the User record
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, { attributes: PUBLIC_ATTRIBUTES });

    if (!userData) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: PUBLIC_ATTRIBUTES });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const token = signToken(userData);
    const { password, ...safeUserData } = userData.toJSON();
    res.status(200).json({ token, userData: safeUserData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE the User record (only the account owner may update it)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ message: "You can only update your own account" });
    }

    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }

    await user.update(req.body);
    const { password, ...safeUserData } = user.toJSON();
    res.status(200).json(safeUserData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const token = signToken(userData);
    const { password, ...safeUserData } = userData.toJSON();
    res.status(200).json({ token, userData: safeUserData });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;
