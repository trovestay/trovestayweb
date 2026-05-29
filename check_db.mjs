import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const { data, error } = await supabaseAdmin.from('properties').select('*').limit(1);
  if (error) console.error(error);
  else console.log("KEYS:", Object.keys(data[0] || {}));
}
check();
