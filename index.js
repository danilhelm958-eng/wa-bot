app.post("/send", (req, res) => {
    let data = "";

    req.on("data", chunk => {
        data += chunk;
    });

    req.on("end", () => {
        console.log("RAW DATA:", data);

        res.send({
            status: "ok",
            raw: data
        });
    });
});
