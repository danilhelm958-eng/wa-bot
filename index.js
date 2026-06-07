const express = require("express");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const app = express();
app.use(express.json());

let sock;

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");

    sock = makeWASocket({
        auth: state,
        printQRInTerminal: true
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;

        if (update.qr) {
            console.log("🔳 QR CODE:");
            console.log(update.qr);
        }

        if (connection === "open") {
            console.log("✅ WHATSAPP CONNECTED");
        }

        if (connection === "close") {
            const code = lastDisconnect?.error?.output?.statusCode;

            const shouldReconnect = code !== DisconnectReason.loggedOut;

            console.log("❌ Connection closed. reconnect:", shouldReconnect);

            if (shouldReconnect) startBot();
        }
    });
}

startBot();

// SEND MESSAGE API
app.post("/send", async (req, res) => {
    try {
        const { number, message } = req.body;

        if (!sock) {
            return res.status(500).json({ error: "Bot belum siap" });
        }

        const jid = number + "@s.whatsapp.net";

        await sock.sendMessage(jid, { text: message });

        res.json({ status: "sent" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("WA Bot aktif");
});

// PORT RAILWAY
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});
