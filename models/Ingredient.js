const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { collection: "ingredientsRef" }
);

const Ingredient = mongoose.model("ingredient", ingredientSchema);
module.exports = Ingredient;
