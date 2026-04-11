import { GoogleGenerativeAI } from '@google/generative-ai';
const genAI = new GoogleGenerativeAI("AIzaSyBumteDFfUqb4F0YKkuGTdbqWb4wXFpCvE");

async function run() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyC2uhWLz_nc5Jhy6Z5g4wGwJNGz714izVk`);
        const data = await response.json();
        console.log("RAW RESPONSE:", JSON.stringify(data, null, 2));
    } catch(e) {
        console.error(e);
    }
}
run();
