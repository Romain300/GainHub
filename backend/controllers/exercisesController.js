const db = require("../db/queries");

async function getAllExercises(req, res) {
    try {
        const exercises = await db.getAllExercises();
        return res.status(200).json({ exercises });
    }catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: "Something went wrong" });
    }
};

module.exports = {
    getAllExercises,
};