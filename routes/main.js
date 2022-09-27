const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/completed/",homeController.finishedExam)
router.get("/profile/",homeController.getProfile);
router.get("/exam",homeController.getExam);
router.get("/final", homeController.finalSubmit)
router.get("/again/:id", homeController.reviewProblem)
router.get("/review",homeController.getReview);
router.get("/past/:id",homeController.getOldExam)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;