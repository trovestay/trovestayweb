'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import styles from './blog.module.css';

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <p style={{ color: '#8e8e93' }}>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <button onClick={() => router.push('/')} style={{ marginTop: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}>Return Home</button>
      </div>
    );
  }

  return (
    <div className={styles.blogLayout}>
      <section className={styles.heroSection}>
        <img src={blog.image_url || '/placeholder.jpg'} alt={blog.title} className={styles.heroImg} />
        <div className={styles.heroOverlay}>
          <Link href="/" className={styles.backBtn}>
            <ArrowLeft size={24} />
          </Link>
          
          <div className={styles.categoryBadge}>{blog.category}</div>
          <h1 className={styles.title}>{blog.title}</h1>
          
          <div className={styles.metaRow}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} /> {blog.date}
            </span>
          </div>
        </div>
      </section>

      <div className={styles.contentContainer}>
        {blog.content.includes('<p>') || blog.content.includes('<h3>') || blog.content.includes('<h2>') ? (
          <div 
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        ) : (
          <div className={styles.articleBody}>
            {blog.content.split('\n\n').map((paragraph: string, idx: number) => (
              <p key={idx}>
                {paragraph.split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {line}
                    {i !== paragraph.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
