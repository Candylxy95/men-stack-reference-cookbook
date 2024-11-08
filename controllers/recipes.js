const User = require("../models/Users");
const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

const getRecipesByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const allRecipes = await Recipe.find({
      owner: user._id,
    });
    if (allRecipes.length === 0) {
      console.log("no recipes available");
    } else res.status(200).json({ recipes: allRecipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postRecipe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const newRecipe = await Recipe.create({
      name: req.body.name,
      instructions: req.body.instructions,
      owner: user._id,
    });
    res.status(200).json({ msg: `${newRecipe.name} successfully added` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOneRecipeByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const recipe = await Recipe.findOne({ _id: req.params.recipeId });
    if (!recipe) {
      return res.status(400).json({ msg: "User not found" });
    }
    res.status(200).json({ msg: recipe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOneRecipe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const recipe = await Recipe.findOne({ _id: req.params.recipeId });
    if (recipe) {
      await recipe.deleteOne();
    } else console.log("recipe is not found");
    res.status(200).json({ msg: `${recipe.name} recipe has been deleted` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateOneRecipe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const recipe = await Recipe.findOne({ _id: req.params.recipeId });
    if (recipe) {
      recipe.set({ name: req.body.name, instructions: req.body.instructions });
      await recipe.save();
    } else res.status(400).json({ msg: "recipe not found" });
    res
      .status(200)
      .json({ msg: `Recipe has been successfully updated -- ${recipe}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addIngredientToRecipe = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    //find recipe by name
    //find ingredient by name
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      return res.status(400).json({ msg: "Recipe not found" });
    }

    const ingredient = await Ingredient.findOne({ name: req.body.name });
    if (!ingredient) {
      return res.status(400).json({ msg: "Ingredient do not exist" });
    }
    if (recipe.ingredients.includes(ingredient._id)) {
      return res
        .status(400)
        .json({ msg: "Ingredient is already in your list" });
    }

    recipe.ingredients.push(ingredient._id);
    await recipe.save();
    res
      .status(200)
      .json({ msg: `${ingredient.name} successfully added to list` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRecipesByUser,
  postRecipe,
  getOneRecipeByUser,
  deleteOneRecipe,
  updateOneRecipe,
  addIngredientToRecipe,
};
