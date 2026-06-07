const express = require("express");
const app = express();

// 🔥 WAJIB PALING ATAS
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// DEBUG MIDDLEWARE (INI PENTING)
app.use((req, res, next) => {
    console.log("➡️ REQUEST:", req.method, req.url);
    next();
});

app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

app.post("/send", (req, res) => {

    console.log("🔥 HEADERS:", req.headers);
    console.log("🔥 BODY:", req.body);

    // FORCE RESPONSE BIAR TIDAK 400
    res.status(200).json({
        status: "ok",
        body: req.body || null
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server jalan di port " + PORT);
});
