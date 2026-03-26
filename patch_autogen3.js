const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\/\/ Auto-title generation \(for preview and generation\)[\s\S]*?return desc\n\}/;

const newContent = `// Auto-title generation (for preview and generation)
const generateAutoTitle = () => {
  const name = form.value.name || 'Slot'
  const provider = slot.value?.providers?.name || ''
  const rtp = form.value.rtp || ''
  const loc = currentLocale.value

  if (loc === 'pt-BR') {
    let title = \`\${name} Demo Grátis\`
    if (provider) title += \` por \${provider}\`
    if (rtp) title += \` | RTP \${rtp}%\`
    title += ' | Brasil'
    return title
  }
  
  if (loc === 'ru') {
    let title = \`\${name} Демо\`
    if (provider) title += \` от \${provider}\`
    if (rtp) title += \` | RTP \${rtp}%\`
    title += ' | Играть Бесплатно'
    return title
  }

  // Format: "Name Slot by Provider | RTP% | Play Free | Brand"
  let title = \`\${name}\`
  if (provider) title += \` by \${provider}\`
  if (rtp) title += \` | RTP \${rtp}%\`
  title += ' | Play Free'

  return title
}

// Auto-description generation (for preview and generation)
const generateAutoDescription = () => {
  const name = form.value.name || 'this exciting slot'
  const provider = slot.value?.providers?.name || 'top provider'
  const rtp = form.value.rtp ? \` RTP \${form.value.rtp}%, \` : ''
  const maxWin = form.value.max_win ? \` Max win \${form.value.max_win}x!\` : ''
  const loc = currentLocale.value

  if (loc === 'pt-BR') {
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
   console.log('Successfully updated JS generation templates with the mathematical formula!');
} else {
   console.log('Regex did NOT match!');
}
