app.get("/test", (req, res) => {
    res.json({ ok: "server aktif" });
});

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("BOT HIDUP ");
});

app.post("/send", (req, res) => {
    console.log("BODY MASUK:", req.body);

    if (!req.body || !req.body.number || !req.body.message) {
        return res.status(400).json({
            status: "error",
            message: "body kosong / tidak valid",
            received: req.body
        });
    }

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
