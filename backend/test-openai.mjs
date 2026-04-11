import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: "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"
});
async function test() {
    try {
        console.log("Testing OpenAI connection...");
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: "hi" }],
            max_tokens: 5
        });
        console.log("OpenAI success:", response.choices[0].message.content);
    } catch (e) {
        console.error("OpenAI failed:", e.message);
    }
}
test();
