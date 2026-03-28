const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the HTML block for Open Graph
// It starts with <!-- Open Graph --> and ends right before <!-- Twitter Card -->
content = content.replace(/<!-- Open Graph -->[\s\S]*?(?=<!-- Twitter Card)/g, '');

// 2. Remove the HTML block for Twitter Card
// It starts with <!-- Twitter Card --> and ends right before <!-- Robots Directives --> or <!-- SEO Score Indicator -->
// Wait, Robots Directives should be next. Let's just match until <!-- Robots
content = content.replace(/<!-- Twitter Card -->[\s\S]*?(?=<!-- Robots)/g, '');

// 3. Remove Reactive states in default state:
const varsToRemove = [
  "og_title: '',",
  "og_description: '',",
  "og_image: '',",
  "og_type: '',",
  "og_locale: '',",
  "og_video: '',",
  "twitter_card: 'summary_large_image',", // It might have a default
  "twitter_site: '',",
  "twitter_title: '',",
  "twitter_description: '',",
  "twitter_image: '',",
  "og_title: null,",
  "og_description: null,",
  "og_image: null,",
  "og_type: null,",
  "og_locale: null,",
  "og_video: null,",
  "twitter_card: null,",
  "twitter_site: null,",
  "twitter_title: null,",
  "twitter_description: null,",
  "twitter_image: null,",
];

varsToRemove.forEach(v => {
  // Regex to remove the exact line with trimming
  const regex = new RegExp(`\\s*${v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'g');
  content = content.replace(regex, '');
});

// Remove from saveSlot payload mapping:
const payloadVars = [
  "og_title:",
  "og_description:",
  "og_image:",
  "og_type:",
  "og_locale:",
  "og_video:",
  "twitter_card:",
  "twitter_site:",
  "twitter_title:",
  "twitter_description:",
  "twitter_image:"
];

payloadVars.forEach(v => {
  const regex = new RegExp(`\\s*${v}\\s*form\\.value\\.${v.replace(':', '')},`, 'g');
  content = content.replace(regex, '');
});

// Let's also remove the SocialPreviewCards import/component usage if it was there
content = content.replace(/import SocialPreviewCards[\s\S]*?\n/g, '');

// Save the file
fs.writeFileSync(filePath, content, 'utf8');
console.log('Surgically removed OG and Twitter sections successfully!');
