const express = require("express");
const router = express.Router();
const { viewUsers, viewOtherUsersRecipes } = require("../controllers/users");

router.get("/", viewUsers);
router.get("/recipes", viewOtherUsersRecipes);

module.exports = router;
