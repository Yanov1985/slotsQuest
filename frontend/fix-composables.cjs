const fs = require('fs');
const files = [
  'composables/useStreamers.ts',
  'composables/usePromotions.ts',
  'composables/useNews.ts',
  'composables/useGlossary.ts',
  'composables/useFeatures.js',
  'composables/useCasinos.ts',
  'composables/useBlogs.ts',
  'server/routes/__sitemap__/urls.ts'
];

files.forEach(f => {
  if(fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/config\.public\.apiBase \|\| ['"`]\/api['"`]/g, 'config.public.apiUrl');
    c = c.replace(/config\.public\.apiBase \|\| 'http:\/\/localhost:3001'/g, 'config.public.apiUrl');
    c = c.replace(/config\.public\.apiBase/g, 'config.public.apiUrl');
    c = c.replace(/\$\{apiBase\}\//g, '${baseURL}/api/');
    c = c.replace(/\bapiBase\b/g, 'baseURL');
    fs.writeFileSync(f, c);
    console.log('Fixed', f);
  } else {
    console.log('File not found:', f)
  }
});
