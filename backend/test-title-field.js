/**
 * Проверка поля overview_features_title в базе данных
 */

const { Pool } = require('pg');
require('dotenv').config();

async function testTitleField() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔍 Проверяем наличие поля overview_features_title...\n');

    // Проверяем структуру таблицы
    const columnCheck = await pool.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns
      WHERE table_name = 'slots'
      AND column_name = 'overview_features_title';
    `);

    if (columnCheck.rows.length > 0) {
      console.log('✅ Поле overview_features_title существует:');
      console.log(columnCheck.rows[0]);
    } else {
      console.log('❌ Поле overview_features_title НЕ найдено в базе данных');
    }

    // Проверяем данные
    const dataCheck = await pool.query(`
      SELECT id, name, overview_features_title
      FROM slots
      LIMIT 1;
    `);

    if (dataCheck.rows.length > 0) {
      console.log('\n📊 Пример данных:');
      console.log('ID:', dataCheck.rows[0].id);
      console.log('Name:', dataCheck.rows[0].name);
      console.log('overview_features_title:', dataCheck.rows[0].overview_features_title || '(пусто)');
    }

    console.log('\n✅ Проверка завершена!');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  } finally {
    await pool.end();
  }
}

testTitleField();
