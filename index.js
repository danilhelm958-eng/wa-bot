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

// WAJIB RAILWAY STYLE
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server jalan di port " + PORT);
});
