const fs = require('fs');
const files = [
  'bonuses/bonuses.controller.ts',
  'categories/categories.controller.ts',
  'features/features.controller.ts',
  'mechanics/mechanics.controller.ts',
  'providers/providers.controller.ts',
  'themes/themes.controller.ts'
];

for(const f of files) {
  const p = `d:/www/Projects/2025/SlotQuest/backend/src/${f}`;
  if(!fs.existsSync(p)) continue;
  let code = fs.readFileSync(p, 'utf8');
  
  if(code.includes('CacheInterceptor')) {
    console.log('Already patched:', f);
    continue;
  }

  // 1. Add UseInterceptors if missing
  if (!code.includes('UseInterceptors')) {
     code = code.replace(/import \s*\{([\s\S]*?)\}\s*from\s*['"]@nestjs\/common['"]/, "import { UseInterceptors, $1} from '@nestjs/common'");
  }

  // 2. Add CacheInterceptor import
  code = code.replace(/from\s*['"]@nestjs\/common['"];?/, "from '@nestjs/common';\nimport { CacheInterceptor } from '@nestjs/cache-manager';");

  // 3. Add to @Get() but only the basic ones, e.g. getAll, getPopular, getFeatured
  code = code.replace(/(@Get\(['"]*(?:popular|featured|.*)['"]*\)\s*\n)\s*(?=async)/g, "$1  @UseInterceptors(CacheInterceptor)\n  ");
  code = code.replace(/(@Get\(\)\s*\n)\s*(?=async)/g, "$1  @UseInterceptors(CacheInterceptor)\n  ");

  fs.writeFileSync(p, code);
  console.log('Patched', f);
}
