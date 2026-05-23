const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
supabase.from('properties').insert([{
  slug: 'test-slug-full',
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
  description: '',
  category: 'Villa',
  contact_type: 'owner',
  owner_name: 'test',
  owner_whatsapp: 'test',
  agent_name: '',
  agent_whatsapp: '',
  commission_percentage: 0,
  has_rooftop: false,
  floors: 1,
  nearby_places: [],
  amenities: [],
  inclusions: [],
  exclusions: [],
  rules: [],
  image_url: '',
  images: []
}]).then(({data, error}) => {
  console.log("Error:", error);
  console.log("Data:", data);
});
