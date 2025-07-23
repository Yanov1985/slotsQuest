const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testDatabase() {
  console.log('Testing Supabase connection...');
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
  console.log('SUPABASE_ANON_KEY exists:', !!process.env.SUPABASE_ANON_KEY);
  
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );
  
  try {
    // Test providers table
    console.log('\nTesting providers table...');
    const { data: providers, error: providersError } = await supabase
      .from('providers')
      .select('*');
    
    console.log('Providers result:', { data: providers, error: providersError });
    
    // Test slot_categories table
    console.log('\nTesting slot_categories table...');
    const { data: categories, error: categoriesError } = await supabase
      .from('slot_categories')
      .select('*');
    
    console.log('Categories result:', { data: categories, error: categoriesError });
    
    // Test slots table
    console.log('\nTesting slots table...');
    const { data: slots, error: slotsError } = await supabase
      .from('slots')
      .select('*');
    
    console.log('Slots result:', { data: slots, error: slotsError });
    
  } catch (error) {
    console.error('Error testing database:', error);
  }
}

testDatabase();