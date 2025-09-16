const fs = require('fs');
const path = require('path');

// Читаем исходный бэкап
const backupPath = path.join(__dirname, '..', 'current_database_backup.sql');
const backupContent = fs.readFileSync(backupPath, 'utf8');

// Исправляем INSERT INTO slots команды
const fixedContent = backupContent
  .replace(
    /INSERT INTO slots \([^)]+\) VALUES/g,
    'INSERT INTO slots (id, name, slug, provider_id, category_id, theme_id, description, image_url, rtp, volatility, min_bet, max_bet, max_win, reels, rows, release_date, is_active, play_count, created_at, updated_at) VALUES'
  )
  .replace(
    /VALUES \('([^']+)', '([^']+)', '([^']+)', '([^']+)', '([^']+)', ([^,]+), ([^,]+), ([^,]+), ([^,]+), '([^']+)', ([^,]+), ([^,]+), ([^,]+), ([^,]+), ([^,]+), '([^']+)', ([^,]+), undefined, undefined, ([^,]+), '([^']+)', '([^']+)'\);/g,
    "VALUES ('$1', '$2', '$3', '$4', '$5', $6, $7, $8, $9, '$10', $11, $12, $13, $14, $15, '$16', $17, $18, '$19', '$20');"
  );

// Сохраняем исправленный бэкап
const fixedBackupPath = path.join(__dirname, '..', 'current_database_backup_fixed.sql');
fs.writeFileSync(fixedBackupPath, fixedContent);

console.log('✅ Бэкап исправлен и сохранен как current_database_backup_fixed.sql');