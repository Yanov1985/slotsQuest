const http = require('http');

http.get('http://127.0.0.1:3001/api/slots/starlight-princess', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        try {
            const slot = JSON.parse(data);
            console.log("RTP:", slot.rtp);
            console.log("Features/Mechanics count:", slot.slot_mechanics ? slot.slot_mechanics.length : 0);
            console.log("Bonuses count:", slot.slot_bonuses ? slot.slot_bonuses.length : 0);
            console.log("Themes count:", slot.slotThemes ? slot.slotThemes.length : 0);
            console.log("\nDUMMY DUMP to see structure:");
            console.log(JSON.stringify(slot.slot_mechanics, null, 2).slice(0, 500));
        } catch (e) {
            console.error("Error parsing JSON:", e);
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
