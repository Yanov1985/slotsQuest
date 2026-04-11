import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyBGvE2Vm6Hzlzfm4BEJ4M13bnu-ZeFpByo");

const modelsToTest = [
    "gemini-2.0-flash",
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
    "gemini-pro"
];

async function run() {
    for (const modelName of modelsToTest) {
        console.log(`\\nTesting model: ${modelName}...`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Say 'hello' in JSON format like {msg: 'hello'}");
            console.log(`✅ SUCCESS [${modelName}]: ${result.response.text().substring(0, 50)}`);
        } catch(e) {
            console.log(`❌ FAILED [${modelName}]: ${e.message.split('\\n')[0]}`);
        }
    }
}
run();
