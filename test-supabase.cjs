const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
async function test() {
  const { data, error } = await supabase.from('properties').insert([{
    slug: 'test-slug',
    title: 'test title',
    location_name: 'test',
    bedrooms: 0,
    bathrooms: 0,
    guests: 0,
    area_sqm: 0,
    has_pool: false,
    listing_type: 'rent',
    monthly_price: 0,
    yearly_price: 0,
    sale_price: 0,
    status: 'published',
    is_rented: false,
    available_from: null,
    youtube_url: '',
    is_campaign: false,
    campaign_label: '',
    campaign_title: '',
    campaign_theme: 'dark',
    description: ''
  }]);
  console.log("Error:", error);
  console.log("Data:", data);
}
test();
