'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import styles from '../../properties/new/form.module.css'; // Reusing the Apple-style form styles

export default function NewBlog() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    summary: '',
    content: '',
    imageUrl: '',
    status: 'published' as 'published' | 'draft',
  });
  
  const [saving, setSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setForm(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      window.location.href = '/admin/blogs';
    }, 1000);
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formHeader}>
        <Link href="/admin/blogs" className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Blogs</span>
        </Link>
        <h1 className={styles.pageTitle}>New Article</h1>
        <p className={styles.pageSubtitle}>
          Draft a new blog post for the homepage and adjust publishing settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {/* Publishing Settings */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Publishing Settings</h2>
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="draft">Draft (Hidden)</option>
                <option value="published">Published (Live)</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="e.g. Market Trends"
                className={styles.input}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Publish Date</label>
              <input
                type="text"
                name="date"
                value={form.date}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Content Details */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Content Details</h2>
          <div className={styles.fieldGrid}>
            <div className={styles.fieldFull}>
              <label className={styles.label}>Article Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Top 5 Investment Trends in Bali"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label}>Short Summary (for cards)</label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="A brief preview of the article..."
                className={styles.textarea}
                style={{ minHeight: '80px' }}
                required
              />
            </div>

            <div className={styles.fieldFull}>
              <label className={styles.label}>Full Article Content (HTML or Plain Text)</label>
              <p style={{ fontSize: '0.85rem', color: '#8e8e93', marginTop: '-0.2rem', marginBottom: '0.8rem' }}>
                *Smart Logic: If you copy and paste plain text, we will automatically format paragraphs and line breaks for you on the live website.
              </p>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Start writing or paste your article here..."
                className={styles.textarea}
                style={{ minHeight: '300px', fontFamily: 'monospace' }}
                required
              />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Cover Image</h2>
          <div className={styles.fieldFull}>
            <div style={{ padding: '0 1.25rem 1.25rem' }}>
              <label className={styles.uploadDropzone} style={{ margin: 0 }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
                <Upload className={styles.uploadIcon} size={28} />
                <span className={styles.uploadText}>Click to upload cover photo</span>
                <span className={styles.uploadSubtext}>Recommended size: 1200x800px</span>
              </label>
            </div>
          </div>

          {form.imageUrl && (
            <div className={styles.imagePreview}>
              <img src={form.imageUrl} alt="Cover Preview" className={styles.previewImg} style={{ aspectRatio: '16/9', objectFit: 'cover' }} />
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className={styles.section} style={{ background: '#f9f9fb', margin: 0, padding: '1.5rem', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f2' }}>
          <button 
            type="submit" 
            className={styles.saveBtn}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#111', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer', fontWeight: 600 }}
          >
            {saving ? <span className={styles.spinner}></span> : <Save size={18} />}
            <span>{saving ? 'Saving...' : 'Save Article'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
