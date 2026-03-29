const fs = require('fs');
const files = [
  'jsonld/jsonld.controller.ts',
  'pages/pages.controller.ts'
];

for(const f of files) {
  const p = `d:/www/Projects/2025/SlotQuest/backend/src/${f}`;
  if(!fs.existsSync(p)) continue;
  let code = fs.readFileSync(p, 'utf8');
  
  if(code.includes('CacheInterceptor')) {
    console.log('Already patched:', f);
    continue;
  }

  if (!code.includes('UseInterceptors')) {
     code = code.replace(/import \s*\{([\s\S]*?)\}\s*from\s*['"]@nestjs\/common['"]/, "import { UseInterceptors, $1} from '@nestjs/common'");
  }

  code = code.replace(/from\s*['"]@nestjs\/common['"];?/, "from '@nestjs/common';\nimport { CacheInterceptor } from '@nestjs/cache-manager';");

  // Inject to ALL @Get routes in these controllers
  code = code.replace(/(@Get\([^)]*\)\s*\n)\s*(?=async|findOne)/g, "$1  @UseInterceptors(CacheInterceptor)\n  ");

  fs.writeFileSync(p, code);
  console.log('Patched', f);
}
