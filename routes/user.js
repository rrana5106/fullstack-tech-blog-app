const router = require("express").Router();
const { User } = require("../models");
const { signToken, authMiddleware } = require("../utils/auth");

// Get current authenticated user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) return res.status(401).json({ message: "Token expired" });
    return res.status(200).json({ user });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET the User record
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password"],
      },
    });

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
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const token = signToken(userData);
    const safeUserData = userData.toJSON();
    delete safeUserData.password;

    res.status(200).json({ token, safeUserData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// UDPATE the User record
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    // req.params.id is a string, but req.user.id is a int, so we convert before comparing
    if (req.user.id !== Number(req.params.id)) {
      res.status(403).json({
        message: "Don't proceed with update",
      });
      return;
    }
    const user = await User.findByPk(req.params.id);

    if (!user) {
      res.status(404).json({ message: "No User found with this id" });
      return;
    }
    // using user.update() here (not User.update()) so Sequelize's beforeUpdate hook actually runs and hashes the password
    await user.update(req.body);
    const safeUserData = user.toJSON();
    delete safeUserData.password;

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
    const safeUserData = userData.toJSON();
    delete safeUserData.password;
    res.status(200).json({ token, safeUserData });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  res.status(204).end();
});

module.exports = router;
