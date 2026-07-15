'use client';

import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSavedProperties } from '../../context/SavedPropertiesContext';
import { supabase } from '../../lib/supabaseClient';
import { Property } from '../../types/property';
import PropertyCard from '../../components/PropertyCard';
import styles from './saved.module.css'; // We'll create this if needed or use inline/globals

export default function SavedPage() {
  const { savedIds } = useSavedProperties();
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      setLoading(true);
      if (savedIds.length === 0) {
        setSavedProperties([]);
        setLoading(false);
        return;
      }

      // Query by slug or id since savedIds could be slug
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('slug', savedIds)
        .eq('status', 'published');

      if (!error && data) {
        const mapped: Property[] = data.map((row: any) => ({
          id: row.slug || row.id,
          title: row.title,
          location: row.location_name,
          price: Number(row.monthly_price) || 0,
          priceYearly: Number(row.yearly_price) || 0,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          guests: row.guests,
          area: row.area_sqm,
          hasPool: row.has_pool,
          category: 'Villa',
          status: row.status,
          isRented: row.is_rented,
          imageUrl: '/placeholder.jpg',
          listingType: row.listing_type,
          salePrice: row.sale_price,
          youtubeUrl: row.youtube_url,
          isCampaign: row.is_campaign,
          campaignLabel: row.campaign_label,
          campaignTitle: row.campaign_title,
          campaignTheme: row.campaign_theme,
          description: row.description
        }));
        setSavedProperties(mapped);
      }
      setLoading(false);
    };

    fetchSavedProperties();
  }, [savedIds]);

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
