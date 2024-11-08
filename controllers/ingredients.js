const User = require("../models/Users");
const Ingredient = require("../models/Ingredient");

const viewIngredients = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const allIngredients = await Ingredient.find();
    if (allIngredients === 0) {
      return res.status(400).json({ msg: "No ingredients available" });
    } else res.status(200).json({ ingredients: allIngredients });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postIngredient = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const newIngredient = await Ingredient.create({
      name: req.body.name,
    });
    res
      .status(200)
      .json({
        msg: `${newIngredient.name} has been successfully added to tray`,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { viewIngredients, postIngredient };
