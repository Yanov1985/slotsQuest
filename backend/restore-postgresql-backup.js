#!/usr/bin/env node

/**
 * 🔄 ВОССТАНОВЛЕНИЕ POSTGRESQL БЕКАПА
 * 
 * Этот скрипт восстанавливает данные из PostgreSQL бекапа
 * в Supabase через Prisma Client
 */

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

console.log('🔄 ВОССТАНОВЛЕНИЕ POSTGRESQL БЕКАПА');
console.log('=' * 50);

async function restorePostgreSQLBackup() {
  try {
    // Найдем последний PostgreSQL бекап
    const backupsDir = path.join(__dirname, '..', 'backups', 'db');
    const files = fs.readdirSync(backupsDir);
    
    const postgresqlBackups = files
      .filter(file => file.includes('postgresql') && file.endsWith('.sql'))
      .sort()
      .reverse();
    
    if (postgresqlBackups.length === 0) {
      throw new Error('PostgreSQL бекапы не найдены в папке backups/db/');
    }
    
    const latestBackup = postgresqlBackups[0];
    const backupPath = path.join(backupsDir, latestBackup);
    
    console.log(`📁 Используем бекап: ${latestBackup}`);
    console.log(`📍 Путь: ${backupPath}`);
    
    // Читаем содержимое бекапа
    const backupContent = fs.readFileSync(backupPath, 'utf8');
    console.log(`📊 Размер бекапа: ${(backupContent.length / 1024).toFixed(1)} KB`);
    
    // Проверяем подключение к БД
    console.log('\n🔌 Проверка подключения к базе данных...');
    await prisma.$connect();
    console.log('✅ Подключение к PostgreSQL установлено');
    
    // Выполняем SQL команды из бекапа
    console.log('\n🚀 Начинаем восстановление данных...');
    
    // Разбиваем на отдельные SQL команды
    const sqlCommands = backupContent
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));
    
    console.log(`📝 Найдено ${sqlCommands.length} SQL команд`);
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < sqlCommands.length; i++) {
      const command = sqlCommands[i];
      
      try {
        // Пропускаем комментарии и пустые строки
        if (command.startsWith('--') || command.trim() === '') {
          continue;
        }
        
        // Выполняем SQL команду
        await prisma.$executeRawUnsafe(command);
        successCount++;
        
        // Показываем прогресс каждые 50 команд
        if ((i + 1) % 50 === 0) {
          console.log(`⏳ Обработано ${i + 1}/${sqlCommands.length} команд...`);
        }
        
      } catch (error) {
        errorCount++;
        
        // Игнорируем некоторые ожидаемые ошибки
        const errorMessage = error.message.toLowerCase();
        if (
          errorMessage.includes('already exists') ||
          errorMessage.includes('duplicate key') ||
          errorMessage.includes('violates unique constraint')
        ) {
          // Это нормально - данные уже существуют
          continue;
        }
        
        console.log(`⚠️ Ошибка в команде ${i + 1}: ${error.message.substring(0, 100)}...`);
        
        // Если слишком много ошибок, останавливаемся
        if (errorCount > 10) {
          console.log('🚨 Слишком много ошибок, останавливаем восстановление');
          break;
        }
      }
    }
    
    console.log('\n📊 РЕЗУЛЬТАТЫ ВОССТАНОВЛЕНИЯ:');
    console.log(`✅ Успешно выполнено: ${successCount} команд`);
    console.log(`⚠️ Ошибок: ${errorCount}`);
    
    // Проверяем восстановленные данные
    console.log('\n🔍 Проверка восстановленных данных...');
    
    const providers = await prisma.provider.count();
    const mechanics = await prisma.mechanic.count();
    const themes = await prisma.theme.count();
    const slots = await prisma.slot.count();
    const categories = await prisma.slotCategory.count();
    
    console.log(`📊 Провайдеры: ${providers}`);
    console.log(`🔧 Механики: ${mechanics}`);
    console.log(`🎨 Темы: ${themes}`);
    console.log(`🎰 Слоты: ${slots}`);
    console.log(`📂 Категории: ${categories}`);
    
    if (providers > 0 && mechanics > 0 && themes > 0) {
      console.log('\n🎉 ВОССТАНОВЛЕНИЕ ЗАВЕРШЕНО УСПЕШНО!');
      console.log('✅ Данные успешно восстановлены в PostgreSQL');
      console.log('🚀 Теперь можно запускать приложение');
    } else {
      console.log('\n⚠️ ВНИМАНИЕ: Некоторые таблицы пусты');
      console.log('🔧 Возможно, нужно проверить формат бекапа');
    }
    
  } catch (error) {
    console.error('\n🚨 ОШИБКА ВОССТАНОВЛЕНИЯ:', error.message);
    console.error('📋 Полная ошибка:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Запускаем восстановление
restorePostgreSQLBackup();