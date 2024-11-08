const express = require("express");
const router = express.Router();
const {
  getRecipesByUser,
  postRecipe,
  getOneRecipeByUser,
  deleteOneRecipe,
  updateOneRecipe,
  addIngredientToRecipe,
} = require("../controllers/recipes");

router.get("/", getRecipesByUser);
router.post("/", postRecipe);
router.get("/:recipeId", getOneRecipeByUser);
router.delete("/:recipeId", deleteOneRecipe);
router.post("/:recipeId", updateOneRecipe);
router.patch("/:recipeId", addIngredientToRecipe);

module.exports = router;
