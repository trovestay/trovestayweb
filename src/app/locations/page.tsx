'use client';

import { useState, useEffect } from 'react';
import Map from '../../components/Map';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { Property } from '../../types/property';

export default function LocationsPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
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
          description: row.description,
          lat: row.lat,
          lng: row.lng
        }));
        setProperties(mapped);
      }
    };
    
    fetchProperties();
  }, []);

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Absolute Back Button to overlay the map nicely */}
      <Link href="/" style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        zIndex: 10,
        backgroundColor: '#fff',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textDecoration: 'none'
      }}>
        <ArrowLeft size={20} color="#111" />
      </Link>
      
      {/* Overlay Header */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111', margin: 0 }}>Explore Locations</h1>
        <span style={{ fontSize: '0.7rem', color: '#8E8E93', fontWeight: 500 }}>{properties.length} Properties in Bali</span>
      </div>

      <div style={{ flex: 1, width: '100%', height: '100%' }}>
        <Map properties={properties} zoom={11} height="100%" borderRadius="0px" />
      </div>
    </div>
  );
}
