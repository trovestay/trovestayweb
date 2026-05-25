'use server';

import { createClient } from '@supabase/supabase-js';

// Initialize a Supabase client with the Service Role Key for backend operations.
// This key bypasses Row-Level Security (RLS) policies.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export async function saveBlog(data: any) {
  try {
    if (!supabaseServiceKey) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Database operations might fail if RLS is enabled.");
    }

    const { error } = await supabaseAdmin
      .from('blogs')
      .insert([
        {
          title: data.title,
          summary: data.summary,
          content: data.content,
          image_url: data.imageUrl,
          author: data.author,
          date: data.date,
          category: data.category,
          status: data.status,
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

export async function updateBlog(id: string, data: any) {
  try {
    if (!supabaseServiceKey) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Database operations might fail if RLS is enabled.");
    }

    const { error } = await supabaseAdmin
      .from('blogs')
      .update({
        title: data.title,
        summary: data.summary,
        content: data.content,
        image_url: data.imageUrl,
        author: data.author,
        date: data.date,
        category: data.category,
        status: data.status,
      })
      .eq('id', id);

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

export async function deleteBlog(id: string) {
  try {
    if (!supabaseServiceKey) {
      console.warn("WARNING: SUPABASE_SERVICE_ROLE_KEY is not set. Database operations might fail if RLS is enabled.");
    }

    const { error } = await supabaseAdmin
      .from('blogs')
      .delete()
      .eq('id', id);

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
