const User = require("../models/Users");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

const viewUsers = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const users = await User.find();
    const usernames = users.map((user) => user.username);
    res.status(200).json({ users: usernames });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewOtherUsersRecipes = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const otherUser = await User.findOne({ username: req.body.username });
    if (!otherUser) {
      return res.status(400).json({ msg: "User not found" });
    }

    const userrecipes = await Recipe.find({ owner: otherUser._id });
    res.status(200).json({ recipes: userrecipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { viewUsers, viewOtherUsersRecipes };
