async function test() {
    const url = 'http://127.0.0.1:3001/api/slots/admin/cmeocg6bd0001u5do1jpoas43';
    console.log('GET', url);
    try {
        const resGet = await fetch(url);
        const dataResponse = await resGet.json();
        const slot = dataResponse.data;
        if (!slot) {
            console.error('No slot found');
            return;
        }

        // Prepare payload like frontend does
        const payload = { ...slot, category_id: "6a14b501-46fd-4305-be29-aab2cdc483ff" };

        // Remove complex nested arrays that the frontend form doesn't send in the main flat object
        delete payload.slot_mechanics;
        delete payload.slot_bonuses;
        delete payload.slotThemes;
        delete payload.providers;
        delete payload.slot_categories;
        delete payload.id; // Usually ID is not in body

        const putUrl = 'http://127.0.0.1:3001/api/slots/' + slot.id;
        const resPut = await fetch(putUrl, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const text = await resPut.text();
        console.log('\n\n=== RESULT ===');
        console.log('PUT Response Status:', resPut.status);
        console.log('PUT Response Body:', text);
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
test();
