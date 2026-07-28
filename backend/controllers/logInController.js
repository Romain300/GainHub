const { validationResult, body } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = [
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email cannot be empty.")
        .isEmail()
        .withMessage("Email must be valid"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty.")
];

const logInUser = [
    validateUser,

    async(req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate("local", { session: false }, (err, user, info) => {
            if (err) return next(err);

            if (!user) {
                return res.status(401).json({
                    errors: [{ msg: info.message }]
                });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "15min"
            });

            return res.status(200).json({
                token,
                user: { email: user.email, username: user.username },
                message: "Auth Passed"
            });

        })(req, res, next)
    }
];

module.exports = {
    logInUser,
};

