const fs = require('fs');
async function test() {
    const url = 'http://127.0.0.1:3001/api/slots/admin/cmeocg6bd0001u5do1jpoas43';
    try {
        const resGet = await fetch(url);
        const dataResponse = await resGet.json();
        const slot = dataResponse.data;

        // Simulate what the frontend sends if some numbers are empty strings
        // because Vue form bindings might set them to ''
        const payload = { ...slot, category_id: "6a14b501-46fd-4305-be29-aab2cdc483ff" };
        delete payload.slot_mechanics;
        delete payload.slot_bonuses;
        delete payload.slotThemes;
        delete payload.providers;
        delete payload.slot_categories;
        delete payload.id;

        // Simulate empty string for a number field that might be empty in form
        payload.rating = "";

        const putUrl = 'http://127.0.0.1:3001/api/slots/' + slot.id;
        const resPut = await fetch(putUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await resPut.text();
        fs.writeFileSync('put_error_empty_string.log', `Status: ${resPut.status}\nBody: ${text}`);
        console.log('Saved to put_error_empty_string.log');
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
test();
