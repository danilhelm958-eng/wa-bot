const express = require("express");
const app = express();

// WAJIB INI
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

app.post("/send", (req, res) => {
    console.log("BODY:", req.body);

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            msg: "body tidak terbaca"
        });
    }

    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({
            status: "error",
            msg: "number & message wajib",
            received: req.body
        });
    }

    res.json({
        status: "ok",
        number,
        message
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
