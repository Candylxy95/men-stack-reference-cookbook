const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructions: { type: String },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    ingredients: { type: [mongoose.Schema.Types.ObjectId], ref: "Ingredients" },
  },
  { collection: "recipesRef" }
);

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
