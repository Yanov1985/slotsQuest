const fs = require('fs');
const path = require('path');

try {
  // try to load from project node_modules
  const compiler = require(path.resolve('d:/www/Projects/2025/SlotQuest/node_modules/vue/compiler-sfc'));
  const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
  const content = fs.readFileSync(filePath, 'utf8');

  const { descriptor, errors } = compiler.parse(content);
  if (errors && errors.length > 0) {
    console.log("Vue Compiler Errors:");
    errors.forEach(err => {
      console.log(`${err.message} at line ${err.loc.start.line}, column ${err.loc.start.column}`);
    });
  } else {
    // If SFC compiles, test the template specifically
    if (descriptor.template) {
      const templateErrors = compiler.compileTemplate({
        source: descriptor.template.content,
        id: 'test'
      }).errors;
      
      if (templateErrors && templateErrors.length > 0) {
        console.log("Template Compiler Errors:");
        templateErrors.forEach(err => {
           // err.loc is sometimes undefined for some template errors
           if (err.loc) {
             console.log(`${err.message} at line ${err.loc.start.line}, column ${err.loc.start.column}`);
           } else {
             console.log(err.message);
           }
        });
      } else {
        console.log("Vue Template parsed successfully!");
      }
    } else {
       console.log("No template block found");
    }
  }
} catch (e) {
  console.log("Could not load vue/compiler-sfc: " + e.message);
}
