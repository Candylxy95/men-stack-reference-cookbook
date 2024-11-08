const express = require("express");
const router = express.Router();
const {
  viewIngredients,
  postIngredient,
} = require("../controllers/ingredients");

router.get("/", viewIngredients);
router.post("/", postIngredient);

module.exports = router;
