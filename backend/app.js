const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
});

app.listen(PORT, () => {
    console.log(`listening on PORT${PORT}`);
});

