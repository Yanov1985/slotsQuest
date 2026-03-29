const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slot = await prisma.slots.findUnique({
    where: { slug: 'gates-of-olympus' }
  });
  
  if (!slot) return;

  // English Base
  const enData = {
    info_pros: "Massive 5,000x max win potential\nIncredible cascading multipliers (up to 500x)\nExciting Free Spins feature\nBeautiful Gates of Olympus graphics",
    info_cons: "High volatility isn't for everyone\nNo traditional wild symbols",
    info_expert_verdict: "Gates of Olympus is a masterclass in high-volatility slot design. The combination of tumbling reels and building multipliers creates unparalleled tension and reward potential. A definitive must-play."
  };

  let locs = {};
  if (slot.localizations) {
    if (typeof slot.localizations === 'string') {
      try { locs = JSON.parse(slot.localizations); } catch(e){}
    } else {
      locs = slot.localizations;
    }
  }

  // pt-BR
  locs['pt-BR'] = locs['pt-BR'] || {};
  locs['pt-BR'].info_pros = "Potencial de ganho enorme (5.000x)\nMultiplicadores épicos de até 500x\nRodadas grátis cheias de ação\nGráficos incríveis de Zeus";
  locs['pt-BR'].info_cons = "Alta volatilidade requer paciência\nNão possui símbolos Wild tradicionais";
  locs['pt-BR'].info_expert_verdict = "Gates of Olympus é uma obra-prima de alta volatilidade. A combinação dos multiplicadores do velho do raio com giros grátis torna cada rodada emocionante. Essencial para jogar no Brasil!";

  // tr
  locs['tr'] = locs['tr'] || {};
  locs['tr'].info_pros = "Devasa 5.000x maksimum kazanç\nİnanılmaz çarpanlar (500x'e kadar)\nHarika Bedava Dönüş (Free Spin) özelliği\nGöz alıcı grafikler";
  locs['tr'].info_cons = "Yüksek volatilite herkese uygun değil\nKlasik Wild sembolleri yok";
  locs['tr'].info_expert_verdict = "Gates of Olympus, yüksek volatiliteli slot oyunları arasında bir başyapıt. Düşen semboller ve birleşen çarpanlar, eşsiz bir heyecan ve kazanç potansiyeli sunuyor. Mutlaka denenmeli.";

  // de
  locs['de'] = locs['de'] || {};
  locs['de'].info_pros = "Riesiges 5.000-faches Gewinnpotenzial\nUnglaubliche kaskadierende Multiplikatoren\nSpannende Freispiele\nWunderschöne Grafiken";
  locs['de'].info_cons = "Hohe Volatilität ist nicht für jeden\nKeine traditionellen Wild-Symbole";
  locs['de'].info_expert_verdict = "Gates of Olympus ist ein Meisterwerk des hochvolatilen Spieldesigns. Die Kombination aus fallenden Walzen und sich aufbauenden Multiplikatoren sorgt für unübertroffene Spannung.";

  // en-IN
  locs['en-IN'] = locs['en-IN'] || {};
  locs['en-IN'].info_pros = "Massive 5,000x max win potential\nAwesome cascading multipliers up to 500x\nExciting Free Spins bonus capability\nBeautiful graphics";
  locs['en-IN'].info_cons = "High volatility slot needs patience\nNo wild symbols available";
  locs['en-IN'].info_expert_verdict = "Gates of Olympus is a masterclass in thrilling gameplay. The combination of tumbling reels and huge multipliers creates incredible entertainment and massive win potential for Indian players.";

  // ru
  locs['ru'] = locs['ru'] || {};
  locs['ru'].info_pros = "Огромный потенциал выигрыша х5000\nНевероятные множители до х500\nЗахватывающий раунд фриспинов\nПотрясающая графика Зевса";
  locs['ru'].info_cons = "Высокая волатильность не для новичков\nНет классических Wild символов";
  locs['ru'].info_expert_verdict = "Врата Олимпа — это настоящий шедевр с высокой волатильностью. Сочетание каскадных барабанов и огромных множителей создает непревзойденное напряжение и потенциал для заносов. Однозначно рекомендуем!";

  await prisma.slots.update({
    where: { slug: 'gates-of-olympus' },
    data: {
      ...enData,
      localizations: JSON.stringify(locs)
    }
  });

  console.log("Successfully injected Pros, Cons, and Verdict for all GEOs!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
