const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: "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" });
console.log("Testing OpenAI with Batch Prompt...");
const prompt = `You are an Elite Semrush SEO Expert.
Write identical JSON for slot "Turbo Mines" by "Unknown Provider".
Include slang, HTML formatting with bold tags, and native translations for these regions: en, es, fr, pt, tr, ru.
Reply with ONLY a JSON OBJECT where keys are language codes from the list provided.
Inside each language object, include exact specific structure:
{
  "seo_title": "string",
  "seo_description": "string",
  "seo_keywords_primary": "string",
  "seo_keywords_lsi": "string",
  "overview": "string (5-6 sentence promotional review with <p> and <strong> tags)",
  "mechanics": "string (explains core features)",
  "expert_verdict": "string",
  "pros": ["string", "string", "string"],
  "cons": ["string", "string"],
  "faq": [{"q": "string", "a": "string"}],
  "reviews": [{"author": "string", "date": "string", "rating": 5, "text": "string"}],
  "cta_button": "string",
  "demo_button": "string"
}`;

openai.chat.completions.create({
  model: "gpt-4o-mini",
  response_format: { type: "json_object" },
  messages: [{ role: "user", content: prompt }],
  temperature: 0.7
}).then(res => console.log("SUCCESS:", JSON.stringify(res.choices[0].message.content, null, 2)))
  .catch(err => console.error("ERROR:", err.message));
