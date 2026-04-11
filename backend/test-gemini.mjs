import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
dotenv.config({ override: true });

async function testGemini() {
    try {
        console.log("Testing Google Gemini API Key...");
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("❌ No GEMINI_API_KEY found in .env");
            return;
        }
        
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const prompt = "Hello, respond with a short confirmation message if my API key works and I have active limits.";
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        console.log("✅ Success! Gemini API responded:");
        console.log("Response:", text);
    } catch (e) {
        console.error("❌ Gemini API Test Failed:");
        console.error(e.message);
    }
}

testGemini();
