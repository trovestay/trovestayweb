const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
supabase.from('properties').select('*').limit(1).then(({data, error}) => {
  console.log("Data:", data);
  console.log("Error:", error);
});
