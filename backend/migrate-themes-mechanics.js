/**
 * Скрипт миграции: Разделение механик и тематик
 *
 * Выполняет:
 * 1. Переносит механики из таблицы themes в mechanics
 * 2. Создаёт бонусы в таблице bonuses
 * 3. Помечает механики в themes как неактивные (is_active: false)
 *
 * Запуск: node migrate-themes-mechanics.js
 */

const API_BASE = 'http://localhost:3001/api';

// Список механик, которые нужно перенести из themes
// Это игровые функции, а не тематики слотов
const MECHANICS_TO_MIGRATE = [
    // Бонусные функции
    { name: 'Bonus Buy', slug: 'bonus-buy', type: 'bonus', icon: '💰', color: '#FFD700', description: 'Покупка бонусного раунда за фиксированную сумму' },
    { name: 'Bonus Bet', slug: 'bonus-bet', type: 'bonus', icon: '🎯', color: '#FF6B6B', description: 'Увеличенная ставка для повышенных шансов на бонус' },
    { name: 'Bonus Multiplier', slug: 'bonus-multiplier', type: 'multiplier', icon: '✖️', color: '#4ECDC4', description: 'Множители во время бонусного раунда' },
    { name: 'Bonus Wheel', slug: 'bonus-wheel', type: 'bonus', icon: '🎡', color: '#45B7D1', description: 'Колесо фортуны в бонусной игре' },

    // Механики барабанов
    { name: 'Cluster Pays', slug: 'cluster-pays', type: 'cluster_pays', icon: '🔲', color: '#9B59B6', description: 'Выигрыши за кластеры одинаковых символов' },
    { name: 'Megaways', slug: 'megaways', type: 'megaways', icon: '🔀', color: '#E74C3C', description: 'Динамическое количество способов выиграть (до 117,649+)' },
    { name: 'Multiways', slug: 'multiways', type: 'megaways', icon: '↔️', color: '#3498DB', description: 'Множество линий выплат в обоих направлениях' },
    { name: 'Scatter Pays', slug: 'scatter-pays', type: 'scatter_pays', icon: '💫', color: '#1ABC9C', description: 'Выплаты за символы в любых позициях' },

    // Wild символы
    { name: 'Sticky Wilds', slug: 'sticky-wilds', type: 'sticky_wilds', icon: '📌', color: '#F39C12', description: 'Wild символы остаются на месте несколько спинов' },
    { name: 'Stacked Wilds', slug: 'stacked-wilds', type: 'expanding_wilds', icon: '📚', color: '#27AE60', description: 'Стопки Wild символов на барабане' },
    { name: 'Walking Wilds', slug: 'walking-wilds', type: 'random_wilds', icon: '🚶', color: '#8E44AD', description: 'Wild символы перемещаются с каждым спином' },
    { name: 'Random Wilds', slug: 'random-wilds', type: 'random_wilds', icon: '🎲', color: '#E67E22', description: 'Случайное добавление Wild символов' },
    { name: 'Colossal Wilds', slug: 'colossal-wilds', type: 'expanding_wilds', icon: '🦣', color: '#2980B9', description: 'Гигантские Wild символы занимают несколько позиций' },
    { name: 'Colossal Symbols', slug: 'colossal-symbols', type: 'expanding_wilds', icon: '🏔️', color: '#16A085', description: 'Гигантские символы 2x2, 3x3 или больше' },
    { name: 'Extra Wilds', slug: 'extra-wilds', type: 'random_wilds', icon: '➕', color: '#D35400', description: 'Дополнительные Wild символы в бонусе' },

    // Расширяющиеся функции
    { name: 'Expanding Reels', slug: 'expanding-reels', type: 'expanding_wilds', icon: '📏', color: '#C0392B', description: 'Барабаны расширяются во время игры' },
    { name: 'Expanding Symbols', slug: 'expanding-symbols', type: 'expanding_wilds', icon: '⬆️', color: '#7D3C98', description: 'Символы расширяются на весь барабан' },
    { name: 'Extra Reels', slug: 'extra-reels', type: 'expanding_wilds', icon: '➕', color: '#1E8449', description: 'Дополнительные барабаны в бонусе' },

    // Дополнительные спины
    { name: 'Re-Spins', slug: 're-spins', type: 'cascading', icon: '🔄', color: '#2E86AB', description: 'Повторные вращения при определённых условиях' },
    { name: 'Extra Spins', slug: 'extra-spins', type: 'cascading', icon: '🎰', color: '#A23B72', description: 'Дополнительные бесплатные спины' },
    { name: 'Dual Spin', slug: 'dual-spin', type: 'cascading', icon: '🔁', color: '#F18F01', description: 'Двойные барабаны или два набора барабанов' },

    // Другие механики
    { name: 'Collect Symbols', slug: 'collect-symbols', type: 'multiplier', icon: '🧲', color: '#C73E1D', description: 'Сбор специальных символов для бонусов' },
    { name: 'Coin Win', slug: 'coin-win', type: 'cash_bonus', icon: '🪙', color: '#FFB627', description: 'Денежные символы с фиксированными выплатами' },
    { name: 'Double Symbols', slug: 'double-symbols', type: 'multiplier', icon: '👯', color: '#3D5A80', description: 'Символы считаются как два' },
    { name: 'Symbol Transform', slug: 'symbol-transform', type: 'random_wilds', icon: '🔮', color: '#7209B7', description: 'Трансформация символов в другие' },
    { name: 'Split Symbols', slug: 'split-symbols', type: 'multiplier', icon: '✂️', color: '#F72585', description: 'Деление символов для большего количества' },
    { name: 'Gamble Feature', slug: 'gamble-feature', type: 'mini_game', icon: '🎴', color: '#4CC9F0', description: 'Возможность рискнуть выигрышем для удвоения' },
    { name: 'Pick Bonus', slug: 'pick-bonus', type: 'pick_bonus', icon: '👆', color: '#560BAD', description: 'Выбор предметов для получения призов' },
    { name: 'Progressive Jackpot', slug: 'progressive-jackpot', type: 'progressive_jackpot', icon: '💎', color: '#480CA8', description: 'Накопительный джекпот' },
    { name: 'Hold & Win', slug: 'hold-and-win', type: 'cash_bonus', icon: '✋', color: '#3A0CA3', description: 'Удержание символов и респины для сбора' },
    { name: 'Tumble Feature', slug: 'tumble-feature', type: 'cascading', icon: '⬇️', color: '#4361EE', description: 'Каскадные выигрыши (аналог Cascading Reels)' },
    { name: 'Win Both Ways', slug: 'win-both-ways', type: 'megaways', icon: '↔️', color: '#4895EF', description: 'Выигрыши в обоих направлениях (слева и справа)' },
];

// Бонусы для создания
const BONUSES_TO_CREATE = [
    { name: 'Free Spins', slug: 'free-spins', type: 'free_spins', icon: '🎰', color: '#4ECDC4', description: 'Бесплатные вращения барабанов', is_popular: true, is_featured: true },
    { name: 'Wheel of Fortune', slug: 'wheel-of-fortune', type: 'wheel_bonus', icon: '🎡', color: '#FFD700', description: 'Колесо фортуны с различными призами', is_popular: true, is_featured: true },
    { name: 'Pick & Click', slug: 'pick-and-click', type: 'pick_bonus', icon: '👆', color: '#9B59B6', description: 'Выберите предметы для получения мгновенных призов', is_popular: true, is_featured: false },
    { name: 'Hold & Spin', slug: 'hold-and-spin', type: 'cash_bonus', icon: '✋', color: '#3498DB', description: 'Удержание денежных символов с респинами', is_popular: true, is_featured: true },
    { name: 'Cash Collection', slug: 'cash-collection', type: 'cash_bonus', icon: '💵', color: '#27AE60', description: 'Сбор денежных символов для выплат', is_popular: false, is_featured: false },
    { name: 'Multiplier Trail', slug: 'multiplier-trail', type: 'multiplier', icon: '📈', color: '#E74C3C', description: 'Увеличение множителя с каждым выигрышем', is_popular: true, is_featured: true },
    { name: 'Jackpot Bonus', slug: 'jackpot-bonus', type: 'progressive_jackpot', icon: '💎', color: '#8E44AD', description: 'Бонусная игра с шансом на джекпот', is_popular: true, is_featured: true },
    { name: 'Gamble Feature', slug: 'gamble-feature', type: 'mini_game', icon: '🎴', color: '#F39C12', description: 'Риск-игра для удвоения выигрыша', is_popular: true, is_featured: false },
    { name: 'Expanding Bonus', slug: 'expanding-bonus', type: 'free_spins', icon: '📏', color: '#1ABC9C', description: 'Бонус с расширяющимися барабанами', is_popular: false, is_featured: false },
    { name: 'Mega Symbols', slug: 'mega-symbols', type: 'free_spins', icon: '🦣', color: '#2980B9', description: 'Гигантские символы в бонусном раунде', is_popular: false, is_featured: false },
    { name: 'Locked Wilds', slug: 'locked-wilds', type: 'free_spins', icon: '🔒', color: '#16A085', description: 'Wild символы закреплённые на барабанах', is_popular: true, is_featured: false },
    { name: 'Retrigger', slug: 'retrigger', type: 'free_spins', icon: '🔁', color: '#D35400', description: 'Повторный запуск бонусных вращений', is_popular: true, is_featured: false },
    { name: 'Buy Bonus', slug: 'buy-bonus', type: 'free_spins', icon: '💰', color: '#C0392B', description: 'Мгновенная покупка бонусного раунда', is_popular: true, is_featured: true },
    { name: 'Ante Bet', slug: 'ante-bet', type: 'multiplier', icon: '⬆️', color: '#7D3C98', description: 'Увеличенная ставка для лучших шансов', is_popular: true, is_featured: false },
    { name: 'Super Spins', slug: 'super-spins', type: 'free_spins', icon: '⭐', color: '#1E8449', description: 'Улучшенные бесплатные вращения', is_popular: false, is_featured: false },
];

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

async function main() {
    console.log('🚀 Начинаем миграцию механик и создание бонусов...\n');

    // 1. Получаем существующие механики
    console.log('📊 Получаем текущие механики...');
    let existingMechanics = [];
    try {
        const result = await fetchApi('/mechanics');
        existingMechanics = result.data || result || [];
        console.log(`   Найдено механик: ${existingMechanics.length}`);
    } catch (e) {
        console.log('   ⚠️ Ошибка получения механик:', e.message);
    }

    const existingMechanicSlugs = new Set(existingMechanics.map(m => m.slug));

    // 2. Добавляем новые механики
    console.log('\n📥 Добавляем новые механики...');
    let addedMechanics = 0;
    let skippedMechanics = 0;

    for (const mechanic of MECHANICS_TO_MIGRATE) {
        if (existingMechanicSlugs.has(mechanic.slug)) {
            console.log(`   ⏭️ Пропущена (уже существует): ${mechanic.name}`);
            skippedMechanics++;
            continue;
        }

        try {
            await fetchApi('/mechanics', {
                method: 'POST',
                body: JSON.stringify({
                    name: mechanic.name,
                    slug: mechanic.slug,
                    description: mechanic.description,
                    type: mechanic.type || 'other',
                    icon: mechanic.icon,
                    color: mechanic.color,
                    is_active: true,
                    is_popular: false,
                    is_featured: false,
                }),
            });
            console.log(`   ✅ Добавлена: ${mechanic.name}`);
            addedMechanics++;
        } catch (e) {
            console.log(`   ❌ Ошибка добавления ${mechanic.name}:`, e.message);
        }
    }

    console.log(`\n📈 Итого механик: добавлено ${addedMechanics}, пропущено ${skippedMechanics}`);

    // 3. Получаем существующие бонусы
    console.log('\n📊 Получаем текущие бонусы...');
    let existingBonuses = [];
    try {
        const result = await fetchApi('/bonuses');
        existingBonuses = result.data || result || [];
        console.log(`   Найдено бонусов: ${existingBonuses.length}`);
    } catch (e) {
        console.log('   ⚠️ Ошибка получения бонусов:', e.message);
    }

    const existingBonusSlugs = new Set(existingBonuses.map(b => b.slug));

    // 4. Создаём бонусы
    console.log('\n📥 Создаём бонусы...');
    let addedBonuses = 0;
    let skippedBonuses = 0;

    for (const bonus of BONUSES_TO_CREATE) {
        if (existingBonusSlugs.has(bonus.slug)) {
            console.log(`   ⏭️ Пропущен (уже существует): ${bonus.name}`);
            skippedBonuses++;
            continue;
        }

        try {
            await fetchApi('/bonuses', {
                method: 'POST',
                body: JSON.stringify({
                    name: bonus.name,
                    slug: bonus.slug,
                    description: bonus.description,
                    type: bonus.type || 'other',
                    icon: bonus.icon,
                    color: bonus.color,
                    is_active: true,
                    is_popular: bonus.is_popular || false,
                    is_featured: bonus.is_featured || false,
                }),
            });
            console.log(`   ✅ Добавлен: ${bonus.name}`);
            addedBonuses++;
        } catch (e) {
            console.log(`   ❌ Ошибка добавления ${bonus.name}:`, e.message);
        }
    }

    console.log(`\n📈 Итого бонусов: добавлено ${addedBonuses}, пропущено ${skippedBonuses}`);

    // 5. Деактивируем механики в themes
    console.log('\n🔧 Деактивируем механики в таблице themes...');
    const mechanicSlugsToDeactivate = MECHANICS_TO_MIGRATE.map(m => m.slug);

    try {
        const themesResult = await fetchApi('/themes');
        const themes = themesResult.data || themesResult || [];

        for (const theme of themes) {
            if (mechanicSlugsToDeactivate.includes(theme.slug) && theme.is_active) {
                try {
                    await fetchApi(`/themes/${theme.id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ is_active: false }),
                    });
                    console.log(`   ⏸️ Деактивирована тема: ${theme.name}`);
                } catch (e) {
                    console.log(`   ⚠️ Не удалось деактивировать ${theme.name}:`, e.message);
                }
            }
        }
    } catch (e) {
        console.log('   ⚠️ Ошибка работы с themes:', e.message);
    }

    console.log('\n✅ Миграция завершена!');
    console.log('============================================================');
    console.log('📋 Следующие шаги:');
    console.log('   1. Проверьте /admin/features (механики)');
    console.log('   2. Проверьте /admin/bonuses (бонусы)');
    console.log('   3. Проверьте /admin/themes (тематики)');
    console.log('   4. Перепривяжите слоты к механикам при необходимости');
}

main().catch(console.error);
