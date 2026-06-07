const express = require("express");
const app = express();

app.use(express.json());

app.post("/send", (req, res) => {
  const { number, message } = req.body;

  console.log("Kirim WA ke:", number);
  console.log("Pesan:", message);

  // nanti di sini kamu sambung ke whatsapp-web.js / baileys

  res.json({ status: "ok", number, message });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Bot jalan di port " + PORT);
});
