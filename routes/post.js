const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");;
const postController = require("../controllers/post")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.post("/:id", postController.createAnswer)

module.exports = router;