async function test() {
    const url = 'http://127.0.0.1:3001/api/slots/cmeocg6bd0001u5do1jpoas43';
    console.log('Sending PUT to', url);
    try {
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_id: "6a14b501-46fd-4305-be29-aab2cdc483ff" })
        });
        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Body:', text);
    } catch (e) {
        console.error('Fetch error:', e);
    }
}
test();
