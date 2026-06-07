const express = require("express");
const app = express();

// ===== MIDDLEWARE WAJIB =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== TEST =====
app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

// ===== SEND =====
app.post("/send", (req, res) => {
    console.log("BODY DARI CLIENT:", req.body);

    // DEBUG FULL
    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "req.body undefined"
        });
    }

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: "error",
            message: "body kosong"
        });
    }

    const { number, message } = req.body;

    if (!number || !message) {
        return res.status(400).json({
            status: "error",
            message: "number & message wajib",
            received: req.body
        });
    }

    return res.json({
        status: "ok",
        number,
        message
    });
});

// ===== PORT =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server jalan di port", PORT);
});
