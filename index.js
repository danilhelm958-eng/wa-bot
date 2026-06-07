const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

app.post("/send", (req, res) => {
    res.json({
        status: "ok",
        number: req.body.number,
        message: req.body.message
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
