import { Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function SavedPage() {
  return (
    <div style={{
      padding: '6rem 1.5rem',
      maxWidth: '800px',
      margin: '0 auto',
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#f4f5f9',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem'
      }}>
        <Bookmark size={40} color="#111" />
      </div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>Saved Properties</h1>
      <p style={{ color: '#8E8E93', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '400px' }}>
        Log in to view your saved premium properties and manage your wishlists.
      </p>
      <Link href="/" style={{
        backgroundColor: '#111',
        color: '#fff',
        padding: '1rem 2rem',
        borderRadius: '24px',
        fontWeight: 700,
        textDecoration: 'none'
      }}>
        Start Exploring
      </Link>
    </div>
  );
}
