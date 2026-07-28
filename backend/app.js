const express = require("express");
const routes = require("./routes");
const cors = require("cors");
require("./middlewares/passportLocal");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
});

app.use("/signIn", routes.signIn);
app.use("/logIn", routes.logIn);

app.listen(PORT, () => {
    console.log(`listening on PORT${PORT}`);
});

//add jwt token for private route