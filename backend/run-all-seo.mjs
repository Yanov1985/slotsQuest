import { spawn } from 'child_process';
import path from 'path';

const scripts = [
  'enrich-providers-seo.mjs',
  'enrich-categories-seo.mjs',
  'generate-blog-seo.mjs',
  'generate-slot-reviews.mjs',
  'generate-glossary.mjs',
  'generate-casino-seo.mjs',
  'generate-promotions-seo.mjs',
  'generate-news-seo.mjs',
  'generate-streamers-seo.mjs'
];

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runScript(script) {
  return new Promise((resolve, reject) => {
    console.log(`\n============================`);
    console.log(`🚀 STARTING: ${script}`);
    console.log(`============================\n`);
    
    // Use the directory of the current script as the working directory
    const child = spawn('node', [script], { 
      stdio: 'inherit',
      cwd: __dirname
    });
    
    child.on('close', code => {
      if (code === 0) {
        console.log(`\n✅ FINISHED: ${script}\n`);
        resolve();
      } else {
        reject(new Error(`${script} exited with code ${code}`));
      }
    });
    
    child.on('error', err => {
      reject(err);
    });
  });
}

async function runAll() {
  try {
    for (const script of scripts) {
      await runScript(script);
    }
    console.log('\n======================================================');
    console.log('🎉 ALL PHASE 3 SEO DAEMONS FINISHED SUCCESSFULLY! 🎉');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ ERROR RUNNING SEO CHAIN:', error);
  }
}

runAll();
