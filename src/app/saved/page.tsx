'use client';

import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useSavedProperties } from '../../context/SavedPropertiesContext';
import { mockProperties } from '../../data/mockProperties';
import PropertyCard from '../../components/PropertyCard';
import styles from './saved.module.css'; // We'll create this if needed or use inline/globals

export default function SavedPage() {
  const { savedIds } = useSavedProperties();
  const savedProperties = mockProperties.filter(property => savedIds.includes(property.id));

  return (
    <div className="container" style={{ padding: '6rem 1.5rem', minHeight: '100vh' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>Saved Properties</h1>
        <p style={{ color: '#8E8E93', fontSize: '1.05rem' }}>
          {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved
        </p>
      </div>

      {savedProperties.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '4rem 0'
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
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem' }}>No saved properties yet</h2>
          <p style={{ color: '#8E8E93', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: '400px' }}>
            Browse our premium properties and click the bookmark icon to save your favorites here.
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
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {savedProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}
