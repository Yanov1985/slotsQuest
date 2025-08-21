const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Список провайдеров из пользовательского ввода
const providersRaw = `100HP Gaming
1spin4win
1wGames
1X2gaming
3 Oaks Gaming
4ThePlayer
7777 Gaming
7Mojos Live
7Mojos Slots
AGT
Amatic
AmigoGaming
Apollo Play
Apparat
AvatarUX
Aviatrix
Barbara Bang
Belatra
BetGames
BetradarVS
Betsoft
Betsolutions
Big Time Gaming
Blue Horn
Booming
Caleta
Champion
Clawbuster
CQ9
Endorphina
Evolution
Evoplay
Ezugi
F*Bastards
Fantasma
Fazi
Formula Spin
Fugaso
Funky Games
Galaxsys
GameBeat
Games Global
Games Inc
Gaming Corps
Gamzix
Gemini
Hacksaw
ICONIC21
Igrosoft
ImagineLive
Iron Dog Studio
JackTop
KA Gaming
Kalamba
Live88
Mancala Gaming
Marbles
Mascot Gaming
Merkur
Microgaming
MPlay
NardsClub
Novomatic
Nucleus Gaming
Onlyplay
PG SOFT
Pixmove
Platipus
Playbro
Playson
Poggiplay
PopiPlay
Prospect Gaming
Relax
RetroGames
Rubyplay
SA Gaming
Skywind
Slotmill
Slotopia
Smartsoft
Spadegaming
SPINMATIC
Spribe
Swintt
Synot
Tadagaming
Tom Horn Gaming
TopSpin
Truelab
Turbo Games
TVBet
Winfinity
WorldMatch
YGRGames
Zillion`;

// Функция для создания slug из названия
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Удаляем специальные символы кроме пробелов и дефисов
    .replace(/\s+/g, '-') // Заменяем пробелы на дефисы
    .replace(/-+/g, '-') // Убираем множественные дефисы
    .trim()
    .replace(/^-+|-+$/g, ''); // Убираем дефисы в начале и конце
}

// Обработка списка провайдеров
function processProviders() {
  const lines = providersRaw.split('\n').filter(line => line.trim());
  const providers = [];
  const seen = new Set();

  for (const line of lines) {
    const name = line.trim();
    if (name && !seen.has(name)) {
      seen.add(name);
      const slug = createSlug(name);
      providers.push({
        name,
        slug,
        description: `Игровой провайдер ${name}`,
        is_active: true
      });
    }
  }

  return providers;
}

async function updateProviders() {
  try {
    console.log('🚀 Начинаю обновление провайдеров...');
    
    // Получаем обработанный список провайдеров
    const providers = processProviders();
    console.log(`📋 Обработано ${providers.length} уникальных провайдеров`);
    
    // Очищаем таблицу провайдеров
    console.log('🗑️ Очищаю таблицу провайдеров...');
    await prisma.providers.deleteMany({});
    console.log('✅ Таблица провайдеров очищена');
    
    // Добавляем новых провайдеров
    console.log('📥 Добавляю новых провайдеров...');
    const result = await prisma.providers.createMany({
      data: providers,
      skipDuplicates: true
    });
    
    console.log(`✅ Успешно добавлено ${result.count} провайдеров`);
    
    // Показываем несколько примеров
    console.log('\n📋 Примеры добавленных провайдеров:');
    const samples = await prisma.providers.findMany({
      take: 5,
      orderBy: { name: 'asc' }
    });
    
    samples.forEach(provider => {
      console.log(`  - ${provider.name} (${provider.slug})`);
    });
    
    console.log('\n🎉 Обновление провайдеров завершено успешно!');
    
  } catch (error) {
    console.error('❌ Ошибка при обновлении провайдеров:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем скрипт
if (require.main === module) {
  updateProviders();
}

module.exports = { updateProviders, processProviders };