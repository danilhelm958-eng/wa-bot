const express = require("express");
const {
    default: makeWASocket,
    useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const app = express();
app.use(express.json());

let sock;

// 🔥 CONNECT WHATSAPP
async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState("auth");

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection } = update;
        if (connection === "open") {
            console.log("✅ WA BOT CONNECTED");
        }
    });
}

startBot();

// 🔥 WEBHOOK DARI PHP
app.post("/send", async (req, res) => {

    try {
        const { number, message } = req.body;

        const jid = number + "@s.whatsapp.net";

        await sock.sendMessage(jid, {
            text: message
        });

        res.json({
            status: "sent",
            to: number
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server jalan di port " + PORT);
});
