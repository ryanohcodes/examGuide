const express = require("express");
const router = express.Router();
const postController = require("../controllers/post")

//Main Routes - simplified for now
router.post("/:id", postController.createAnswer)

module.exports = router;