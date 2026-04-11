import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scripts = [
  'enrich-deep-seo.mjs',
  'generate-slot-reviews.mjs'
];

async function runScript(script) {
  return new Promise((resolve, reject) => {
    console.log(`\n============================`);
    console.log(`🚀 STARTING: ${script}`);
    console.log(`============================\n`);
    
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
    console.log('🎉 ALL CONTENT GENERATION DAEMONS FINISHED SUCCESSFULLY! 🎉');
    console.log('======================================================\n');
  } catch (error) {
    console.error('\n❌ ERROR RUNNING GENERATION CHAIN:', error);
  }
}

runAll();
