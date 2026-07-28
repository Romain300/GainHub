const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateUser = [
    body("firstname")
        .trim()
        .notEmpty()
        .withMessage("First name cannot be empty."),
    body("lastname")
        .trim()
        .notEmpty()
        .withMessage("Last name cannot be empty."),    
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email cannot be empty.")
        .isEmail()
        .withMessage("Email must be valid."),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty."),
    body("cpassword")
        .trim()
        .notEmpty()
        .withMessage("Confirm password cannot be empty.")
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Password and Confirm password must match.");
            }
            return true;
        })
];

const createUser = [
    validateUser,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            console.log("Creating new user...");
            const { firstname, lastname, email, password} = req.body;
            const userExist = await db.getUserByEmail(email);
            if (userExist) {
                return res.status(400).json({
                    errors: [{ msg: "Email already used" }],
                });
            }
            const username = `${firstname}${lastname}`.toLowerCase();
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.createUser(firstname, lastname, username, email, hashedPassword);
            console.log("New user has been created");
            return res.status(201).json({
                message: "User created successfully",
                user: { 
                    id: user.id, 
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email
                }
            });
        }catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: "Something went wrong during user creation "});
        }
    }    
];

module.exports = {
    createUser
};


