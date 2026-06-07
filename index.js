const express = require("express");
const app = express();

// 🔥 WAJIB INI (URUTAN JUGA PENTING)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

app.post("/send", (req, res) => {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            status: "error",
            msg: "BODY KOSONG / TIDAK TERBACA"
        });
    }

    const { number, message } = req.body;

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
