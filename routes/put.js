const express = require("express");
const router = express.Router();
const putController = require("../controllers/put")

//Main Routes - simplified for now
router.post("/:id", putController.updateAnswer)
module.exports = router;