const fs = require('fs');
const path = require('path');

const modalPath = path.resolve(__dirname, '../frontend/components/slots/SlotInfoModal.vue');
let content = fs.readFileSync(modalPath, 'utf8');

content = content.replace(
  /demoDesc: 'You can easily try out \{name\} online slot at our catalog without paying real money\. Take advantage of our free demo mode and dive right in!'/g,
  "demoDesc: 'You can easily try out {name} online slot at our catalog without paying real money. Take advantage of our free demo mode and dive right in!',\n    playDemoNow: 'Play Demo Now'"
);

content = content.replace(
  /demoDesc: 'Você pode testar facilmente o slot \{name\} em nosso catálogo sem pagar dinheiro real\. Aproveite nosso modo demo gratuito e mergulhe de cabeça!'/g,
  "demoDesc: 'Você pode testar facilmente o slot {name} em nosso catálogo sem pagar dinheiro real. Aproveite nosso modo demo gratuito e mergulhe de cabeça!',\n    playDemoNow: 'Jogar Demo Agora'"
);

content = content.replace(
  /demoDesc: 'Вы можете легко попробовать онлайн-слот \{name\} в нашем каталоге без риска реальными деньгами\. Воспользуйтесь бесплатным демо-режимом прямо сейчас!'/g,
  "demoDesc: 'Вы можете легко попробовать онлайн-слот {name} в нашем каталоге без риска реальными деньгами. Воспользуйтесь бесплатным демо-режимом прямо сейчас!',\n    playDemoNow: 'Играть Демо'"
);

content = content.replace(
  /demoDesc: 'Kataloğumuzdaki \{name\} slotunu gerçek para ödemeden kolayca deneyebilirsiniz\. Ücretsiz demo modumuzdan yararlanın ve hemen oynamaya başlayın!'/g,
  "demoDesc: 'Kataloğumuzdaki {name} slotunu gerçek para ödemeden kolayca deneyebilirsiniz. Ücretsiz demo modumuzdan yararlanın ve hemen oynamaya başlayın!',\n    playDemoNow: 'Şimdi Demo Oyna'"
);

content = content.replace(
  /demoDesc: 'Sie können den Online-Slot \{name\} in unserem Katalog ganz einfach und ohne echtes Geld ausprobieren\. Nutzen Sie unseren kostenlosen Demo-Modus!'/g,
  "demoDesc: 'Sie können den Online-Slot {name} in unserem Katalog ganz einfach und ohne echtes Geld ausprobieren. Nutzen Sie unseren kostenlosen Demo-Modus!',\n    playDemoNow: 'Jetzt Demo Spielen'"
);

content = content.replace(
  /\{\{ slotData\.info_demo_btn_text \|\| 'Play Demo Now' \}\}/g,
  "{{ slotData.info_demo_btn_text || t('playDemoNow') }}"
);

fs.writeFileSync(modalPath, content, 'utf8');
console.log("Successfully patched playDemoNow translations!");
