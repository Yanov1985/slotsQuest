const fs = require('fs');
const path = require('path');

const modalPath = path.resolve(__dirname, '../frontend/components/slots/SlotInfoModal.vue');
let content = fs.readFileSync(modalPath, 'utf8');

// Update the translations object to include 'demoDesc'
content = content.replace(
  /freePlayDemo: 'Free Play or Demo'/g,
  "freePlayDemo: 'Free Play or Demo',\n    demoDesc: 'You can easily try out {name} online slot at our catalog without paying real money. Take advantage of our free demo mode and dive right in!'"
);

content = content.replace(
  /freePlayDemo: 'Jogo Grátis ou Demo'/g,
  "freePlayDemo: 'Jogo Grátis ou Demo',\n    demoDesc: 'Você pode testar facilmente o slot {name} em nosso catálogo sem pagar dinheiro real. Aproveite nosso modo demo gratuito e mergulhe de cabeça!'"
);

content = content.replace(
  /freePlayDemo: 'Бесплатная игра \(Демо\)'/g,
  "freePlayDemo: 'Бесплатная игра (Демо)',\n    demoDesc: 'Вы можете легко попробовать онлайн-слот {name} в нашем каталоге без риска реальными деньгами. Воспользуйтесь бесплатным демо-режимом прямо сейчас!'"
);

content = content.replace(
  /freePlayDemo: 'Ücretsiz Oyna veya Demo'/g,
  "freePlayDemo: 'Ücretsiz Oyna veya Demo',\n    demoDesc: 'Kataloğumuzdaki {name} slotunu gerçek para ödemeden kolayca deneyebilirsiniz. Ücretsiz demo modumuzdan yararlanın ve hemen oynamaya başlayın!'"
);

content = content.replace(
  /freePlayDemo: 'Kostenloses Spiel oder Demo'/g,
  "freePlayDemo: 'Kostenloses Spiel oder Demo',\n    demoDesc: 'Sie können den Online-Slot {name} in unserem Katalog ganz einfach und ohne echtes Geld ausprobieren. Nutzen Sie unseren kostenlosen Demo-Modus!'"
);

// Update the template line 187
content = content.replace(
  /\{\{ slotData\.info_demo_cta \|\| \`You can easily try out \$\{slotData\.name\} online slot at our catalog without paying real money\. Take advantage of our free demo mode and dive right in\!\` \}\}/g,
  "{{ slotData.info_demo_cta || t('demoDesc').replace('{name}', slotData.name) }}"
);

fs.writeFileSync(modalPath, content, 'utf8');

console.log("Successfully patched SlotInfoModal.vue with demoDesc translations!");
