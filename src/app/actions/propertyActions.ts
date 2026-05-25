'use server';

import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client with the Service Role Key for backend operations.
// This key bypasses Row-Level Security (RLS) policies.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function saveProperty(data: any) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set.");
      return { success: false, error: 'Configuration Error: SUPABASE_SERVICE_ROLE_KEY is missing in Vercel Environment Variables. Please add the service_role secret key in Vercel and redeploy your site.' };
    }

    const { error } = await supabaseAdmin
      .from('properties')
      .insert([
        {
          slug: data.slug,
          title: data.title,
          location_name: data.location_name,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          guests: data.guests,
          area_sqm: data.area_sqm,
          has_pool: data.has_pool,
          listing_type: data.listing_type,
          monthly_price: data.monthly_price,
          yearly_price: data.yearly_price,
          sale_price: data.sale_price,
          status: data.status,
          is_rented: data.is_rented,
          available_from: data.available_from,
          youtube_url: data.youtube_url,
          is_campaign: data.is_campaign,
          campaign_label: data.campaign_label,
          campaign_title: data.campaign_title,
          campaign_theme: data.campaign_theme,
          description: data.description
        }
      ]);

    if (error) {
      console.error('Supabase Admin Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Exception:', err);
    return { success: false, error: err.message || 'An unexpected error occurred' };
  }
}

export async function updateProperty(id: string, data: any) {
  try {
    if (!supabaseServiceKey) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Database operations might fail if RLS is enabled.");
    }

    const { error } = await supabaseAdmin
      .from('properties')
      .update({
        title: data.title,
        location_name: data.location_name,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        guests: data.guests,
        area_sqm: data.area_sqm,
        has_pool: data.has_pool,
        listing_type: data.listing_type,
        monthly_price: data.monthly_price,
        yearly_price: data.yearly_price,
        sale_price: data.sale_price,
        status: data.status,
        is_rented: data.is_rented,
        available_from: data.available_from,
        youtube_url: data.youtube_url,
        is_campaign: data.is_campaign,
        campaign_label: data.campaign_label,
        campaign_title: data.campaign_title,
        campaign_theme: data.campaign_theme,
        description: data.description
      })
      .eq('slug', id);

    if (error) {
      console.error('Supabase Admin Update Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Exception:', err);
    return { success: false, error: err.message || 'An unexpected error occurred' };
  }
}

export async function deleteProperty(id: string) {
  try {
    if (!supabaseServiceKey) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Database operations might fail if RLS is enabled.");
    }

    const { error } = await supabaseAdmin
      .from('properties')
      .delete()
      .eq('slug', id);

    if (error) {
      console.error('Supabase Admin Delete Error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Server Action Exception:', err);
    return { success: false, error: err.message || 'An unexpected error occurred' };
  }
}
