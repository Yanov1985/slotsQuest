const fs = require('fs');
const path = require('path');

const filePath = path.resolve('d:/www/Projects/2025/SlotQuest/frontend/pages/admin/slots/[id].vue');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /\/\/ Auto-title generation \(for preview\)[\s\S]*?return desc\n\}/;

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
    return title.length > 60 ? title.substring(0, 57) + '...' : title
  }
  
  if (loc === 'ru') {
    let title = \`\${name} Демо\`
    if (provider) title += \` от \${provider}\`
    if (rtp) title += \` | RTP \${rtp}%\`
    title += ' | Играть Бесплатно'
    return title.length > 60 ? title.substring(0, 57) + '...' : title
  }

  // Format: "Name Slot by Provider | RTP% | Play Free | Brand"
  let title = \`\${name}\`
  if (provider) title += \` by \${provider}\`
  if (rtp) title += \` | RTP \${rtp}%\`
  title += ' | Play Free'

  // Trim to 60 characters
  if (title.length > 60) {
    title = title.substring(0, 57) + '...'
  }

  return title
}

// Auto-description generation (for preview and generation)
const generateAutoDescription = () => {
  const name = form.value.name || 'this exciting slot'
  const provider = slot.value?.providers?.name || 'top provider'
  const rtp = form.value.rtp ? \` RTP \${form.value.rtp}%,\` : ''
  const maxWin = form.value.max_win ? \` Max win \${form.value.max_win}x!\` : ''
  const loc = currentLocale.value

  if (loc === 'pt-BR') {
    let desc = \`🎰 Jogue \${name} grátis por \${provider}. Aproveite\${rtp}. Demo grátis e a dinheiro real.\${maxWin} ⭐\`
    return desc.length > 160 ? desc.substring(0, 157) + '...' : desc
  }
  
  if (loc === 'ru') {
    let desc = \`🎰 Играть \${name} бесплатно от \${provider}. Высокий\${rtp} Доступно демо и на деньги.\${maxWin} ⭐\`
    return desc.length > 160 ? desc.substring(0, 157) + '...' : desc
  }

  let desc = \`🎰 Play \${name} by \${provider} -\${rtp} \${form.value.volatility || 'high'} volatility. Free demo & real money.\${maxWin} ⭐\`

  // Trim to 160 characters
  if (desc.length > 160) {
    desc = desc.substring(0, 157) + '...'
  }

  return desc
}`;

if(content.match(regex)) {
   content = content.replace(regex, newContent);
   fs.writeFileSync(filePath, content, 'utf8');
   console.log('Successfully updated JS generation templates!');
} else {
   console.log('Regex did NOT match!');
}
