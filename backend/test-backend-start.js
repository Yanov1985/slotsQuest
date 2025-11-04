#!/usr/bin/env node

/**
 * 🧪 ТЕСТ ЗАПУСКА BACKEND
 *
 * Пробуем запустить backend и ловим ошибки
 */

const { spawn } = require('child_process');

console.log('🧪 ТЕСТ ЗАПУСКА BACKEND\n');
console.log('='.repeat(60));

const backend = spawn('npm', ['run', 'start:dev'], {
  cwd: __dirname,
  shell: true
});

let output = '';
let errorOutput = '';
let hasError = false;

backend.stdout.on('data', (data) => {
  const text = data.toString();
  output += text;
  process.stdout.write(text);

  // Проверяем успешный запуск
  if (text.includes('Backend server running')) {
    console.log('\n' + '='.repeat(60));
    console.log('✅ BACKEND УСПЕШНО ЗАПУЩЕН!');
    console.log('🌐 API доступно на: http://localhost:3001');
    console.log('='.repeat(60));

    // Даем серверу поработать 5 секунд, затем останавливаем
    setTimeout(() => {
      console.log('\n📝 Останавливаю тестовый запуск...');
      backend.kill();
      process.exit(0);
    }, 5000);
  }
});

backend.stderr.on('data', (data) => {
  const text = data.toString();
  errorOutput += text;
  hasError = true;
  process.stderr.write(text);
});

backend.on('close', (code) => {
  if (code !== 0 && code !== null) {
    console.log('\n' + '='.repeat(60));
    console.log('❌ BACKEND ЗАВЕРШИЛСЯ С ОШИБКОЙ');
    console.log(`Код выхода: ${code}`);
    console.log('='.repeat(60));

    if (errorOutput) {
      console.log('\n📋 ОШИБКИ:');
      console.log(errorOutput);
    }
  }
});

// Таймаут на случай зависания
setTimeout(() => {
  if (!output.includes('Backend server running')) {
    console.log('\n' + '='.repeat(60));
    console.log('⏱️  ТАЙМАУТ: Backend не запустился за 30 секунд');
    console.log('='.repeat(60));

    if (output) {
      console.log('\n📋 ВЫВОД:');
      console.log(output.substring(output.length - 500));
    }

    backend.kill();
    process.exit(1);
  }
}, 30000);
