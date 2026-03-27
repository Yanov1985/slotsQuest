const fs = require('fs');

const filePath = 'd:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue';
let content = fs.readFileSync(filePath, 'utf8');

// Function to safely remove a block using start/end strings
function removeBlock(html, startStr, endStr) {
  const startIdx = html.indexOf(startStr);
  if (startIdx === -1) return html;
  
  const endIdx = html.indexOf(endStr, startIdx);
  if (endIdx === -1) return html;
  
  // Cut it out
  return html.substring(0, startIdx) + html.substring(endIdx + endStr.length);
}

// 1. Remove Long-tail phrases
content = removeBlock(content, '<!-- 4. Long-tail phrases (specific queries) -->', '🎯 Long target phrases used to search for specific information\n                            </p>\n                          </div>');

// 2. Remove Old field
content = removeBlock(content, '<!-- Old field for backward compatibility -->', 'Old field (for compatibility)\n                            </label>\n                            <input\n                              v-model="form.seo_keywords"\n                              type="text"\n                              placeholder="Automatically generated from new fields above"\n                              class="w-full px-4 py-3 bg-[#1B1E26] border border-[#353A4A] rounded-lg text-[#9CA3AF] placeholder-[#6B7280] focus:outline-none transition-all duration-200"\n                              readonly\n                            />\n                          </div>');

// 3. Remove Gameplay Video
content = removeBlock(content, '<!-- 🎬 Gameplay Video (for VideoObject Schema) -->', '🎥 Link to video review/gameplay (improves SEO with VideoObject Schema)\n                            </p>\n                          </div>');

// 4. Remove Video Duration
content = removeBlock(content, '<!-- ⏱️ Video Duration -->', 'Format: PT3M (3 min), PT5M30S (5 min 30 sec)\n                            </p>\n                          </div>');

// 5. Remove Alternative Slot Names
content = removeBlock(content, '<!-- 🌐 Alternative Slot Names -->', '📝 Slot names in different languages (comma-separated)\n                            </p>\n                          </div>');


// Now remove from const form = ref(...)
content = content.replace(/seo_keywords_longtail:\s*'',?\n\s*/g, '');
content = content.replace(/seo_keywords:\s*'',?\n\s*/g, '');
content = content.replace(/video_url:\s*'',?\n\s*/g, '');
content = content.replace(/video_duration:\s*'',?\n\s*/g, '');
content = content.replace(/alternative_names:\s*'',?\n\s*/g, '');


// Also remove longtail assignment from generateAllSeoKeywords
content = content.replace(/form\.value\.seo_keywords_longtail\s*=\s*[^;]+;\n/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Finished removing redundant fields from template and script!');
