/**
 * Скрипт SEO оптимизации тематик
 * Добавляет описания, иконки и цвета ко всем тематикам
 *
 * Запуск: node seo-optimize-themes.js
 */

const API_BASE = 'http://localhost:3001/api';

// Маппинг тематик на категории с иконками, цветами и описаниями
const THEME_CATEGORIES = {
    // Культуры и цивилизации
    cultures: {
        themes: ['egyptian', 'aztec', 'mayan', 'greek', 'rome', 'asian', 'oriental', 'arabian', 'celtic', 'norse', 'nordic', 'vikings', 'irish', 'chinese', 'japanese', 'indian', 'african', 'native-american', 'slavic'],
        icon: '🏛️',
        color: '#C9A227',
        descriptionTemplate: (name) => `Слоты в стиле ${name} — погрузитесь в атмосферу древних цивилизаций с уникальными символами и бонусами`
    },

    // Мифология и боги
    mythology: {
        themes: ['mythology', 'mythical', 'olympus', 'zeus', 'thor', 'odin', 'poseidon', 'gods', 'legends', 'mystic', 'voodoo'],
        icon: '⚡',
        color: '#7C3AED',
        descriptionTemplate: (name) => `Слоты ${name} — легендарные игры с богами и мифическими существами`
    },

    // Животные
    animals: {
        themes: ['animals', 'wolf', 'cats', 'dogs', 'birds', 'fish', 'lions', 'tigers', 'bears', 'elephants', 'horses', 'dragons', 'dinosaurs', 'insects', 'butterflies', 'monkeys', 'gorillas', 'safari', 'jungle', 'wildlife'],
        icon: '🦁',
        color: '#059669',
        descriptionTemplate: (name) => `Слоты с тематикой ${name} — дикая природа и экзотические животные на барабанах`
    },

    // Фэнтези и магия
    fantasy: {
        themes: ['fantasy', 'magic', 'wizards', 'witches', 'fairies', 'elves', 'dwarves', 'trolls', 'unicorns', 'enchanted', 'magical', 'fairy-tale', 'fairy', 'fairytale', 'book', 'books'],
        icon: '🧙',
        color: '#8B5CF6',
        descriptionTemplate: (name) => `Слоты ${name} — волшебные миры с магическими бонусами и заклинаниями`
    },

    // Приключения
    adventure: {
        themes: ['adventure', 'treasure', 'treasures', 'explorer', 'expedition', 'quest', 'journey', 'discovery', 'hunt', 'temple', 'tomb', 'pyramid', 'ruins', 'ancient', 'archaeology'],
        icon: '🗺️',
        color: '#D97706',
        descriptionTemplate: (name) => `Слоты ${name} — захватывающие приключения в поисках сокровищ и артефактов`
    },

    // Пираты и море
    pirates: {
        themes: ['pirates', 'sea', 'ocean', 'ships', 'nautical', 'underwater', 'mermaids', 'atlantis', 'fishing', 'beach', 'island', 'tropical', 'tiki', 'caribbean'],
        icon: '🏴‍☠️',
        color: '#0891B2',
        descriptionTemplate: (name) => `Слоты ${name} — морские приключения с пиратами и подводными сокровищами`
    },

    // Космос и будущее
    space: {
        themes: ['space', 'aliens', 'ufo', 'galaxy', 'stars', 'cosmic', 'robots', 'cyberpunk', 'futuristic', 'sci-fi', 'technology', 'neon'],
        icon: '🚀',
        color: '#3B82F6',
        descriptionTemplate: (name) => `Слоты ${name} — космические путешествия и футуристические технологии`
    },

    // Хоррор
    horror: {
        themes: ['horror', 'vampires', 'zombies', 'ghosts', 'halloween', 'dark', 'gothic', 'mystery', 'monsters', 'werewolves', 'skulls', 'death', 'apocalypse'],
        icon: '👻',
        color: '#991B1B',
        descriptionTemplate: (name) => `Слоты ${name} — жуткие приключения с монстрами и потусторонними силами`
    },

    // Праздники
    holidays: {
        themes: ['christmas', 'easter', 'halloween', 'valentines', 'santa-claus', 'winter', 'snow', 'new-year', 'party', 'carnival', 'festival', 'celebration'],
        icon: '🎄',
        color: '#DC2626',
        descriptionTemplate: (name) => `Слоты ${name} — праздничное настроение с тематическими бонусами`
    },

    // Богатство и роскошь
    luxury: {
        themes: ['luxury', 'riches', 'gold', 'diamonds', 'gems', 'gem', 'jewels', 'jewelry', 'money', 'cash', 'wealth', 'casino', 'vegas', 'poker', 'fortune', 'lucky', 'luck'],
        icon: '💎',
        color: '#F59E0B',
        descriptionTemplate: (name) => `Слоты ${name} — роскошь, драгоценности и большие выигрыши`
    },

    // Фрукты и классика
    classic: {
        themes: ['fruit', 'fruits', 'classic', 'retro', 'vintage', 'sevens', 'bars', 'bells', 'cherries', 'lemons', 'oranges', 'grapes', 'watermelons', 'joker'],
        icon: '🍒',
        color: '#EF4444',
        descriptionTemplate: (name) => `Классические слоты ${name} — ностальгия по традиционным игровым автоматам`
    },

    // Еда и напитки
    food: {
        themes: ['food', 'candy', 'sweets', 'chocolate', 'cake', 'beer', 'wine', 'drinks', 'cooking', 'restaurant', 'sushi'],
        icon: '🍬',
        color: '#EC4899',
        descriptionTemplate: (name) => `Слоты ${name} — сладкие выигрыши и аппетитные бонусы`
    },

    // Спорт
    sports: {
        themes: ['sports', 'football', 'soccer', 'basketball', 'boxing', 'racing', 'cars', 'horses', 'olympics', 'wrestling', 'fishing-sport', 'golf', 'tennis'],
        icon: '⚽',
        color: '#10B981',
        descriptionTemplate: (name) => `Слоты ${name} — спортивные эмоции и командный дух`
    },

    // Музыка и развлечения
    entertainment: {
        themes: ['music', 'rock', 'disco', 'dance', 'concert', 'movie', 'movies', 'film', 'tv', 'circus', 'show', 'theater', 'comedy', 'superheroes', 'comics'],
        icon: '🎸',
        color: '#6366F1',
        descriptionTemplate: (name) => `Слоты ${name} — музыка, кино и яркие шоу на барабанах`
    },

    // Война и воины
    warriors: {
        themes: ['warriors', 'battle', 'war', 'soldiers', 'army', 'knights', 'samurai', 'ninja', 'gladiators', 'spartans', 'medieval', 'castle', 'kingdom', 'king', 'queen', 'royal'],
        icon: '⚔️',
        color: '#78716C',
        descriptionTemplate: (name) => `Слоты ${name} — эпические битвы и героические сражения`
    },

    // Природа
    nature: {
        themes: ['nature', 'forest', 'garden', 'flowers', 'trees', 'mountains', 'water', 'fire', 'earth', 'elements', 'seasons', 'spring', 'summer', 'autumn', 'fall', 'rain', 'thunder', 'storm', 'volcano'],
        icon: '🌿',
        color: '#22C55E',
        descriptionTemplate: (name) => `Слоты ${name} — красота природы и сила стихий`
    },

    // Дикий Запад
    western: {
        themes: ['wild-west', 'cowboys', 'western', 'sheriffs', 'outlaws', 'gold-rush', 'saloon', 'rodeo', 'desert'],
        icon: '🤠',
        color: '#A16207',
        descriptionTemplate: (name) => `Слоты ${name} — атмосфера Дикого Запада с ковбоями и золотой лихорадкой`
    },

    // Стимпанк
    steampunk: {
        themes: ['steampunk', 'clockwork', 'gears', 'mechanical', 'industrial', 'inventions'],
        icon: '⚙️',
        color: '#78350F',
        descriptionTemplate: (name) => `Слоты ${name} — викторианская эстетика и паровые механизмы`
    },

    // Азия
    asia: {
        themes: ['anime', 'manga', 'fortune', 'koi', 'panda', 'lucky-cat', 'dragon', 'bamboo', 'lanterns', 'temple-asian'],
        icon: '🎎',
        color: '#E11D48',
        descriptionTemplate: (name) => `Слоты ${name} — азиатская культура и восточная эстетика`
    },

    // Механики как тематики (нужно деактивировать)
    mechanics_as_themes: {
        themes: ['megaways', 'cluster-pays', 'cascading', 'tumble', 'hold-and-win', 'popwins', 'xways-slots', 'multimax', 'doublemax', 'powerways', 'trueways', 'blitzways', 'nobleways', 'wonderways', 'xtraways', 'megapays', 'xpays', 'splitz', 'xsplit', 'multipop', 'hyperspins', 'nitro-reels', 'power-reels', 'xnudge', 'nudges', 'xbomb', 'xbet', 'xgod', 'xhole', 'xmental', 'xmount', 'xzone', 'xtrahold', 'ways-boost', 'ways-plus', 'wild-zones', 'second-chance', 'meter-pay', 'burst-mode', 'megadozer'],
        icon: '⚙️',
        color: '#6B7280',
        descriptionTemplate: (name) => `${name} — игровая механика слотов`,
        shouldDeactivate: true
    }
};

// Дефолтные значения для тематик без категории
const DEFAULT_THEME = {
    icon: '🎰',
    color: '#6366F1',
    descriptionTemplate: (name) => `Слоты ${name} — уникальная тематика с захватывающим геймплеем`
};

async function fetchApi(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`API Error: ${response.status} - ${text}`);
    }
    return response.json();
}

function findCategoryForTheme(slug) {
    for (const [categoryName, category] of Object.entries(THEME_CATEGORIES)) {
        if (category.themes.includes(slug)) {
            return { categoryName, category };
        }
    }
    return null;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function main() {
    console.log('🚀 Начинаем SEO оптимизацию тематик...\n');

    // 1. Получаем все тематики
    console.log('📊 Получаем список тематик...');
    let themes = [];
    try {
        const result = await fetchApi('/themes');
        themes = result.data || result || [];
        console.log(`   Найдено тематик: ${themes.length}`);
    } catch (e) {
        console.log('   ❌ Ошибка получения тематик:', e.message);
        return;
    }

    let updated = 0;
    let deactivated = 0;
    let skipped = 0;

    // 2. Обновляем каждую тематику
    console.log('\n📝 Обновляем тематики...\n');

    for (const theme of themes) {
        const categoryInfo = findCategoryForTheme(theme.slug);

        if (categoryInfo) {
            const { categoryName, category } = categoryInfo;

            // Если это механика — деактивируем
            if (category.shouldDeactivate && theme.is_active) {
                try {
                    await fetchApi(`/themes/${theme.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ is_active: false }),
                    });
                    console.log(`   ⏸️ Деактивирована механика: ${theme.name}`);
                    deactivated++;
                    continue;
                } catch (e) {
                    console.log(`   ⚠️ Ошибка деактивации ${theme.name}:`, e.message);
                }
            }

            // Обновляем тематику
            const needsUpdate = !theme.description || !theme.icon || !theme.color;

            if (needsUpdate) {
                try {
                    const updateData = {};

                    if (!theme.description) {
                        updateData.description = category.descriptionTemplate(theme.name);
                    }
                    if (!theme.icon) {
                        updateData.icon = category.icon;
                    }
                    if (!theme.color) {
                        updateData.color = category.color;
                    }

                    await fetchApi(`/themes/${theme.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updateData),
                    });
                    console.log(`   ✅ Обновлена: ${theme.name} (${categoryName})`);
                    updated++;
                } catch (e) {
                    console.log(`   ❌ Ошибка обновления ${theme.name}:`, e.message);
                }
            } else {
                skipped++;
            }
        } else {
            // Тематика без категории — используем дефолтные значения
            const needsUpdate = !theme.description || !theme.icon || !theme.color;

            if (needsUpdate) {
                try {
                    const updateData = {};

                    if (!theme.description) {
                        updateData.description = DEFAULT_THEME.descriptionTemplate(theme.name);
                    }
                    if (!theme.icon) {
                        updateData.icon = DEFAULT_THEME.icon;
                    }
                    if (!theme.color) {
                        updateData.color = DEFAULT_THEME.color;
                    }

                    await fetchApi(`/themes/${theme.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updateData),
                    });
                    console.log(`   ✅ Обновлена (дефолт): ${theme.name}`);
                    updated++;
                } catch (e) {
                    console.log(`   ❌ Ошибка обновления ${theme.name}:`, e.message);
                }
            } else {
                skipped++;
            }
        }
    }

    console.log('\n============================================================');
    console.log('📊 Результаты SEO оптимизации тематик:');
    console.log(`   ✅ Обновлено: ${updated}`);
    console.log(`   ⏸️ Деактивировано (механики): ${deactivated}`);
    console.log(`   ⏭️ Пропущено (уже заполнены): ${skipped}`);
    console.log('============================================================\n');
}

main().catch(console.error);
