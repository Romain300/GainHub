const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { getUserByEmail } = require("../db/queries");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },

        async (email, password, done) => {
            try {
                const user = await getUserByEmail(email);

                if (!user) {
                    return done(null, false, {
                        message: "Incorrect email or password.",
                    });
                }

                const match = await bcrypt.compare(password, user.password);

                if (!match) {
                    return done(null, false, {
                        message: "Incorrect email or password",
                    });
                }

                return done(null, user);

            }catch (err) {
                return done(err);
            }
        }
    )
);