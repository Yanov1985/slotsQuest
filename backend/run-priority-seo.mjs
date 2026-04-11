import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'generate-blog-seo.mjs',
  'generate-news-seo.mjs',
  'generate-streamers-seo.mjs',
  'generate-casino-seo.mjs',
  'generate-glossary.mjs',
  'generate-slot-reviews.mjs',
  'generate-promotions-seo.mjs',
  'enrich-providers-seo.mjs',
  'enrich-categories-seo.mjs'
];

async function runScriptParallel(script) {
  return new Promise((resolve) => {
    console.log(`🚀 [START] ${script}`);
    const child = spawn('node', [script], { 
      stdio: 'inherit',
      cwd: __dirname
    });
    
    child.on('close', code => {
      console.log(`✅ [DONE] ${script} (Code: ${code})`);
      resolve();
    });

    child.on('error', err => {
      console.error(`❌ [ERROR] ${script}:`, err);
      resolve();
    });
  });
}

async function main() {
  console.log("🔥 LAUNCHING ALL SEO DAEMONS IN PARALLEL 🔥");
  // We run them in parallel to maximize throughput now that we have 100+ items to catch up on
  await Promise.all(scripts.map(s => runScriptParallel(s)));
  console.log("🏁 ALL PARALLEL TASKS FINISHED.");
}

main();
