'use client';

import { useState, useEffect } from 'react';
import PropertyCard from '../../components/PropertyCard';
import { supabase } from '../../lib/supabaseClient';
import { Property } from '../../types/property';
import styles from './Properties.module.css';

export default function Properties() {
  const [sort, setSort] = useState('popular');
  const [category, setCategory] = useState('All');

  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

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
        setProperties(mapped);
      }
      setLoading(false);
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(p => 
    category === 'All' ? true : p.category === category
  );

  return (
    <div className={`container ${styles.containerLayout}`}>
      <div className={styles.headerArea}>
        <h1>Find your perfect stay.</h1>
        <p>Explore our highly curated selection of luxury properties across Bali.</p>
      </div>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebarFilters}>
          <div className={styles.filterGroup}>
            <h4>Location</h4>
            <select className={styles.filterSelect}>
              <option>All Locations</option>
              <option>Canggu</option>
              <option>Ubud</option>
              <option>Seminyak</option>
              <option>Uluwatu</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h4>Property Type</h4>
            <select 
              className={styles.filterSelect}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Beachfront">Beachfront</option>
              <option value="Jungle">Jungle</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h4>Price Range</h4>
            <select className={styles.filterSelect}>
              <option>Any Price</option>
              <option>Rp 0 - Rp 3.000.000</option>
              <option>Rp 3.000.000 - Rp 6.000.000</option>
              <option>Rp 6.000.000 - Rp 10.000.000</option>
              <option>Rp 10.000.000+</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <h4>Bedrooms</h4>
            <div className={styles.checkboxGroup}>
              {[1, 2, 3, 4, '5+'].map(num => (
                <label key={num} className={styles.checkboxItem}>
                  <input type="checkbox" />
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </label>
              ))}
            </div>
          </div>
          
          <div className={styles.filterGroup}>
            <h4>Rental Period</h4>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxItem}><input type="checkbox" /> Daily</label>
              <label className={styles.checkboxItem}><input type="checkbox" /> Monthly</label>
              <label className={styles.checkboxItem}><input type="checkbox" /> Yearly</label>
            </div>
          </div>
        </aside>

        <div className={styles.gridArea}>
          <div className={styles.resultsHeader}>
            <span className={styles.resultsCount}>{filteredProperties.length} Properties found</span>
            <select 
              className={styles.sortSelect}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className={styles.propertyGrid}>
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
