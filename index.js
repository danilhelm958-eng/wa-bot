const express = require("express");
const app = express();

app.use(express.json());

// TEST
app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

// SEND WA (dummy dulu / nanti sambung Baileys)
app.post("/send", (req, res) => {
    console.log("BODY:", req.body);

    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({
            status: "error",
            msg: "number & message wajib"
        });
    }

    return res.json({
        status: "ok",
        number,
        message
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
