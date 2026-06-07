const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("BOT HIDUP ✅");
});

app.post("/send", (req, res) => {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);

    res.status(200).json({
        status: "ok",
        body: req.body
    });
});

// WAJIB RAILWAY STYLE
const PORT = process.env.PORT;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server jalan di port " + PORT);
});
