const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Нам нужен Session Pooler (порт 5432 на aws-1-eu-central-1), чтобы:
// 1. Обойти IPv6 ограничения Windows для direct connection (db.qhgcisqapoxdqycfgqxf).
// 2. Обойти Transaction Pooler (порт 6543), который не переваривает гигантсткие многооператорные SQL (error 08P01).
const dbUrl = "postgresql://postgres.qhgcisqapoxdqycfgqxf:Guru007Yanov%21@aws-1-eu-central-1.pooler.supabase.com:5432/postgres";

const client = new Client({
  connectionString: dbUrl,
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

async function runMigration() {
  try {
    console.log('🔌 Connecting to Supabase PostgreSQL (via Pooler 6543)...');
    await client.connect();
    console.log('✅ Connected successfully!');

    const sqlPath = path.join(__dirname, 'migration.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log('🚧 Executing migration.sql statement by statement to bypass PgBouncer limits...');
    
    // Split SQL by semicolon and execute individually to avoid 08P01 error
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    for (let i = 0; i < statements.length; i++) {
        await client.query(statements[i]);
    }
    
    console.log('🎉 Migration executed successfully! All ' + statements.length + ' tables/indexes created.');

  } catch (err) {
    console.error('❌ Migration Error:', err);
  } finally {
    await client.end();
  }
}

runMigration();
