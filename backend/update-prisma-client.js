const { execSync } = require('child_process');

console.log('🔄 Обновление Prisma Client...');
console.log('⚠️  Убедитесь, что сервер остановлен!');
console.log('');

try {
  // Пытаемся сгенерировать Prisma Client
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('');
  console.log('✅ Prisma Client успешно обновлён!');
  console.log('');
  console.log('Теперь запустите сервер:');
  console.log('npm run start:dev');
} catch (error) {
  console.error('❌ Ошибка при обновлении Prisma Client:', error.message);
  console.log('');
  console.log('💡 Попробуйте:');
  console.log('1. Остановить сервер (Ctrl+C)');
  console.log('2. Подождать 5 секунд');
  console.log('3. Запустить снова: node update-prisma-client.js');
  process.exit(1);
}


