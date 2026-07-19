// Import required packages
const sequelize = require("../config/connection");

// import models
const { Post, Category } = require("../models");

// add data and seeding for Category model

// import seed data
const postData = require("./posts.json");

// Seed database
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Category.bulkCreate([
    { category_name: "Web Development" },
    { category_name: "Backend Development" },
    { category_name: "DevOps" },
  ]);
  await Post.bulkCreate(postData);

  process.exit(0);
};

// Call seedDatabase function
seedDatabase();
