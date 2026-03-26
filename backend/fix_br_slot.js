const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const slots = await prisma.slots.findMany({ 
    where: { name: { contains: 'Olympus' } } 
  });
  
  if (slots.length === 0) {
    console.log('No slots with Olympus found!');
    return;
  }
  
  console.log(`Found ${slots.length} slots matching 'Olympus'. Updating all of them for pt-BR...`);

  const perfectBrData = {
    seo_title: "Gates of Olympus Demo: Jogue o Velho do Raio Grátis",
    seo_description: "Descubra como jogar e ganhar no Gates of Olympus (Velho do Raio). Teste a versão demo grátis, confira a estratégia do super scatter e busque o max win de 5000x.",
    seo_focus_keyword: "gates of olympus demo",
    seo_keywords_primary: "gates of olympus demo, gates of olympus, gates of olympus 1000 demo, gates of olympus super scatter demo, velho do raio",
    seo_keywords_lsi: "velho do raio demo, gates of olympus pragmatic play, gates of olympus como ganhar, estratégia gates of olympus, demo gates of olympus grátis, melhor horário para jogar gates of olympus",
    seo_keywords_geo: "Brasil (BR)",
    keyword_primary_target: "gates of olympus demo",
    keyword_density_score: 92,
    keyword_analysis_result: "Otimização perfeita para 'gates of olympus demo' (Vol: 6.6K) e 'velho do raio' no mercado brasileiro. Intenção de busca misturada (Informacional e Transacional).",
    keyword_suggestions: "como jogar gates of olympus, qual melhor horário para jogar gates of olympus, como pegar max win no gates of olympus",
    keyword_competitors: "pragmaticplay.com, meutimao.com.br, terra.com.br",
    hero_title: "Gates of Olympus",
    hero_subtitle: "Junte-se ao Velho do Raio em Busca do Max Win",
    hero_badge_text: "Top #1 no Brasil",
    top_badge_text: "Demo Grátis",
    hero_keyword: "Velho do Raio",
    hero_keyword_2: "Demo Grátis",
    hero_keyword_3: "Super Scatter x500",
    description: "Gates of Olympus, carinhosamente conhecido no Brasil como 'O Jogo do Velho do Raio', é um dos slots de maior sucesso da Pragmatic Play. Com multiplicadores que chegam a 500x a qualquer momento e a chance de ganhar até 5000x sua aposta (Max Win), ele redefiniu os jogos com a mecânica 'Tumble'.",
    features_description: "Experimente a Demo gratuita para testar diferentes estratégias e descobrir o melhor horário para jogar sem risco.",
    json_ld_faq: JSON.stringify([
      { question: "Como jogar Gates of Olympus?", answer: "Para jogar, defina o valor da sua aposta e clique no botão de giro. O jogo utiliza a mecânica 'Scatter Pays', onde os símbolos pagam em qualquer lugar da tela, desde que haja pelo menos 8 símbolos iguais." },
      { question: "Como ganhar no Gates of Olympus?", answer: "A chave para grandes vitórias está nos multiplicadores (até x500) que o Super Scatter (Velho do Raio) solta aleatoriamente e nas rodadas grátis (Free Spins)." },
      { question: "Como pegar max win no Gates of Olympus?", answer: "O max win de 5000x é alcançado acumulando multiplicadores massivos durante as Rodadas Grátis (Free Spins). Muitos jogadores testam primeiro na versão Demo grátis." },
      { question: "Qual melhor horário para jogar Gates of Olympus?", answer: "Embora muitos procurem 'minutos pagantes' ou o melhor horário para lucrar, os resultados são determinados por um Gerador de Números Aleatórios (RNG) e o RTP do jogo (96.50%), garantindo justiça 24h por dia." }
    ])
  };

  for (const slot of slots) {
    let locs = typeof slot.localizations === 'string' ? JSON.parse(slot.localizations) : (slot.localizations || {});
    locs['pt-BR'] = { ...locs['pt-BR'], ...perfectBrData };
    
    await prisma.slots.update({
      where: { id: slot.id },
      data: { localizations: locs }
    });
    console.log(`Updated slot: ${slot.name} (ID: ${slot.id})`);
  }
  
  console.log('SUCCESS! Updated real slots.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
