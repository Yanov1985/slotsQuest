const { Mechanic } = require('../../models');

const mechanicsData = [
  {
    name: 'Cascading Reels',
    slug: 'cascading-reels',
    description: 'Выигрышные символы исчезают, а новые падают сверху, создавая цепочки выигрышей',
    icon: '🌊',
    color: '#3B82F6',
    type: 'reel_mechanic',
    is_active: true,
    is_popular: true,
    is_featured: true,
    popularity_score: 88,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Scatter Pays',
    slug: 'scatter-pays',
    description: 'Выплаты происходят за любое количество одинаковых символов на экране',
    icon: '💫',
    color: '#8B5CF6',
    type: 'payout_mechanic',
    is_active: true,
    is_popular: true,
    is_featured: true,
    popularity_score: 85,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Random Multiplier',
    slug: 'random-multiplier',
    description: 'Случайные множители применяются к выигрышам во время игры',
    icon: '🎲',
    color: '#F59E0B',
    type: 'modifier',
    is_active: true,
    is_popular: true,
    is_featured: false,
    popularity_score: 82,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Megaways',
    slug: 'megaways',
    description: 'Динамическое количество символов на каждом барабане создает тысячи способов выиграть',
    icon: '🔥',
    color: '#EF4444',
    type: 'reel_mechanic',
    is_active: true,
    is_popular: true,
    is_featured: true,
    popularity_score: 92,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Hold & Win',
    slug: 'hold-win',
    description: 'Специальные символы фиксируются на месте для дополнительных спинов',
    icon: '🔒',
    color: '#10B981',
    type: 'feature_mechanic',
    is_active: true,
    is_popular: true,
    is_featured: false,
    popularity_score: 78,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Expanding Wilds',
    slug: 'expanding-wilds',
    description: 'Wild символы расширяются на весь барабан при появлении',
    icon: '📏',
    color: '#06B6D4',
    type: 'symbol_mechanic',
    is_active: true,
    is_popular: true,
    is_featured: false,
    popularity_score: 75,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  }
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Проверяем, есть ли уже данные в таблице
      const existingMechanics = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM mechanics',
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (existingMechanics[0].count > 0) {
        console.log('Механики уже существуют, пропускаем seed');
        return;
      }

      await queryInterface.bulkInsert('mechanics', mechanicsData);
      console.log('Seed данные для механик успешно добавлены');
    } catch (error) {
      console.error('Ошибка при добавлении seed данных для механик:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('mechanics', null, {});
      console.log('Seed данные для механик успешно удалены');
    } catch (error) {
      console.error('Ошибка при удалении seed данных для механик:', error);
      throw error;
    }
  }
};