const fs = require('fs');
const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the HTML block for Open Graph
const ogRegex = /\s*<!-- Open Graph -->[\s\S]*?(?=\s*<!-- Twitter Card -->)/;
if (ogRegex.test(content)) {
    content = content.replace(ogRegex, '');
    console.log("Successfully removed Open Graph block!");
} else {
    console.log("Could not find Open Graph block matching regex!");
}

// 2. Remove the HTML block for Twitter Card
const twitterRegex = /\s*<!-- Twitter Card -->[\s\S]*?(?=\s*<!-- Technical SEO -->)/;
if (twitterRegex.test(content)) {
    content = content.replace(twitterRegex, '');
    console.log("Successfully removed Twitter Card block!");
} else {
    console.log("Could not find Twitter Card block matching regex!");
}

// 3. Remove Reactive states
const varsToRemove = [
  "og_title: '',",
  "og_description: '',",
  "og_image: '',",
  "og_type: '',",
  "og_locale: '',",
  "og_video: '',",
  "twitter_card: 'summary_large_image',",
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
  "twitter_image: null,"
];

varsToRemove.forEach(v => {
  const regex = new RegExp(`\\s*${v.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}`, 'g');
  content = content.replace(regex, '');
});

// Remove from saveSlot payload mapping:
const payloadVars = [
  "og_title:", "og_description:", "og_image:", "og_type:", "og_locale:", "og_video:",
  "twitter_card:", "twitter_site:", "twitter_title:", "twitter_description:", "twitter_image:"
];

payloadVars.forEach(v => {
  const regex = new RegExp(`\\s*${v}\\s*form\\.value\\.${v.replace(':', '')},`, 'g');
  content = content.replace(regex, '');
});

content = content.replace(/import SocialPreviewCards[\s\S]*?\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Cleaned securely!');
