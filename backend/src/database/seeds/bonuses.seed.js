const { Bonus } = require('../../models');

const bonusesData = [
  {
    name: 'Free Spins',
    slug: 'free-spins',
    description: 'Бесплатные вращения барабанов без дополнительных ставок',
    icon: '🎰',
    color: '#10B981',
    type: 'feature',
    is_active: true,
    is_popular: true,
    is_featured: true,
    popularity_score: 95,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Wild Symbol',
    slug: 'wild-symbol',
    description: 'Символ, который заменяет другие символы для создания выигрышных комбинаций',
    icon: '🃏',
    color: '#8B5CF6',
    type: 'symbol',
    is_active: true,
    is_popular: true,
    is_featured: false,
    popularity_score: 90,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Bonus Game',
    slug: 'bonus-game',
    description: 'Дополнительная мини-игра с особыми правилами и призами',
    icon: '🎮',
    color: '#F59E0B',
    type: 'feature',
    is_active: true,
    is_popular: true,
    is_featured: true,
    popularity_score: 85,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Multiplier',
    slug: 'multiplier',
    description: 'Увеличивает выигрыш в определенное количество раз',
    icon: '✖️',
    color: '#EF4444',
    type: 'modifier',
    is_active: true,
    is_popular: true,
    is_featured: false,
    popularity_score: 80,
    usage_count: 0,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Scatter Symbol',
    slug: 'scatter-symbol',
    description: 'Специальный символ, который активирует бонусные функции независимо от позиции',
    icon: '💎',
    color: '#06B6D4',
    type: 'symbol',
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
      const existingBonuses = await queryInterface.sequelize.query(
        'SELECT COUNT(*) as count FROM bonuses',
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (existingBonuses[0].count > 0) {
        console.log('Бонусы уже существуют, пропускаем seed');
        return;
      }

      await queryInterface.bulkInsert('bonuses', bonusesData);
      console.log('Seed данные для бонусов успешно добавлены');
    } catch (error) {
      console.error('Ошибка при добавлении seed данных для бонусов:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('bonuses', null, {});
      console.log('Seed данные для бонусов успешно удалены');
    } catch (error) {
      console.error('Ошибка при удалении seed данных для бонусов:', error);
      throw error;
    }
  }
};