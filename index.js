const express = require("express");
const app = express();

// 🔥 WAJIB TARUH PALING ATAS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TEST ROOT
app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

// TEST SEND (DEBUG TOTAL)
app.post("/send", (req, res) => {

    console.log("===== REQUEST MASUK =====");
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    if (!req.body) {
        return res.status(400).json({
            status: "error",
            message: "body kosong"
        });
    }

    res.json({
        status: "ok",
        received: req.body
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server jalan di port " + PORT);
});
