const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\/\/ Auto-description generation \(for preview and generation\)[\s\S]*?return \`🎰 Play \S+ by \S+ -.*?\n\}/;

const newContent = `// Auto-description generation (for preview and generation)
const generateAutoDescription = () => {
  const name = form.value.name || 'this exciting slot'
  const isOlympus = name.toLowerCase().includes('olympus')
  const provider = slot.value?.providers?.name || 'top provider'
  const rtp = form.value.rtp ? \` RTP \${form.value.rtp}%, \` : ''
  const maxWin = form.value.max_win ? \` Max win \${form.value.max_win}x!\` : ''
  const loc = currentLocale.value

  if (loc === 'pt-BR') {
    if (isOlympus) {
      // 149 characters: Perfect for Mobile & Desktop SERP limits
      // Targets: "demo grátis", "Gates of Olympus", "velho do raio", "estratégia", "max win"
      return "Jogue a demo grátis do Gates of Olympus (O Velho do Raio)! Teste a estratégia do super scatter, alcance o max win de 5000x e divirta-se sem risco."
    }
    return \`🎰 Jogue \${name} (Demo Grátis) por \${provider}. Aproveite\${rtp}alta volatilidade. Demo grátis e a dinheiro real.\${maxWin} ⭐\`
  }
  
  if (loc === 'ru') {
    return \`🎰 Играть \${name} бесплатно от \${provider}. Высокий\${rtp}доступно демо и на деньги.\${maxWin} ⭐\`
  }

  return \`🎰 Play \${name} by \${provider} -\${rtp}\${form.value.volatility || 'high'} volatility. Free demo & real money.\${maxWin} ⭐\`
}`;

if(content.match(regex)) {
   content = content.replace(regex, newContent);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log('Successfully updated JS generation template with perfect Olympus Description!');
} else {
   console.log('Regex did NOT match!');
}
