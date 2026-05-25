'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, LayoutTemplate, Clock, User, Tag } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import { deleteBlog } from '../../actions/blogActions';
import styles from './blogs.module.css';

export default function AdminBlogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      const result = await deleteBlog(id);
      if (result.success) {
        setBlogs(blogs.filter(b => b.id !== id));
      } else {
        alert('Failed to delete blog post');
      }
    }
  };
  
  const filteredBlogs = blogs.filter(
    (b) => b.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
           b.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.blogsPage}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Blog Management</h1>
          <p className={styles.pageSubtitle}>Manage and publish articles for your audience.</p>
        </div>
        <Link href="/admin/blogs/new" className={styles.addBtn}>
          <Plus size={18} />
          <span>Write New Post</span>
        </Link>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchInput}>
          <Search size={16} color="#8e8e93" style={{ marginRight: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', background: 'transparent' }}
          />
        </div>
      </div>

      <div className={styles.blogList}>
        {loading ? (
          <div style={{ padding: '4rem', textAlign: 'center' }}>
            <p style={{ color: '#8e8e93' }}>Loading articles...</p>
          </div>
        ) : filteredBlogs.map(blog => (
          <div key={blog.id} className={styles.blogListItem}>
            <div className={styles.thumbnailWrapper}>
              <img src={blog.image_url || '/placeholder.jpg'} alt={blog.title} className={styles.thumbnail} />
            </div>
            
            <div className={styles.blogInfo}>
              <div className={styles.titleRow}>
                <h3 className={styles.blogTitle}>{blog.title}</h3>
                <span className={`${styles.statusBadge} ${blog.status === 'published' ? styles.published : styles.draft}`}>
                  {blog.status}
                </span>
              </div>
              
              <div className={styles.metaInfo}>
                <span className={styles.metaItem}>
                  <Tag size={14} /> {blog.category}
                </span>
                <span className={styles.metaItem}>
                  <Clock size={14} /> {blog.date}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <Link href={`/admin/blogs/edit/${blog.id}`} className={styles.actionBtn} title="Edit">
                <Edit size={16} />
              </Link>
              <button onClick={() => handleDelete(blog.id)} className={styles.actionBtn} title="Delete">
                <Trash2 size={16} color="#ff3b30" />
              </button>
            </div>
          </div>
        ))}

        {!loading && filteredBlogs.length === 0 && (
          <div style={{ padding: '4rem', textAlign: 'center', background: 'white', borderRadius: '16px', border: '1px solid #e5e5ea' }}>
            <LayoutTemplate size={48} color="#e5e5ea" style={{ margin: '0 auto 1rem' }} />
            <p style={{ color: '#8e8e93', fontSize: '1.1rem' }}>No articles found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
