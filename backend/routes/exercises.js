const { getAllExercises } = require("../controllers/exercisesController");
const { Router } = require("express");

const router = Router();
router.get("/", getAllExercises);

module.exports = router;
//check passport.authenticate
