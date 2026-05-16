'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { mockBlogs } from '../../../data/mockBlogs';
import styles from './blog.module.css';

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  
  const blog = mockBlogs.find(b => b.id === id);

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
        <img src={blog.imageUrl} alt={blog.title} className={styles.heroImg} />
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
            {blog.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>
                {paragraph.split('\n').map((line, i) => (
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
