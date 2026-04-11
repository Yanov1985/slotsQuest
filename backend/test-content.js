const fs = require('fs');
try {
  let fileContent = fs.readFileSync('./starlight.json', 'utf8');
  let data;
  try {
    data = JSON.parse(fileContent);
  } catch (e) {
    console.error("Failed to parse starlight.json as JSON");
    process.exit(1);
  }
  
  let localizations = data.localizations;
  if (typeof localizations === 'string') {
    localizations = JSON.parse(localizations);
  }
  
  const ru = localizations ? localizations.ru : null;
  if (!ru) {
    console.log("No russian localization found.");
  } else {
    console.log("=== 1) Обзор слотов (overview) ===");
    console.log(ru.overview_title || "N/A");
    console.log(ru.overview || "N/A");
    console.log("\n");

    console.log("=== 2) Механики (mechanics) ===");
    console.log(ru.mechanics_title || "N/A");
    console.log(ru.mechanics || "N/A");
    console.log("\n");

    console.log("=== 3) FAQ (faq) ===");
    console.log(ru.faq || "N/A");
    console.log("\n");
  }
} catch (e) {
  console.error(e);
}
