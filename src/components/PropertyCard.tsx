'use client';

import { Bookmark, Star, ArrowRight, Bed, Bath, Waves, Maximize } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import styles from './PropertyCard.module.css';
import type { Property } from '../data/mockProperties';
import { useAppContext } from '../context/AppContext';

export default function PropertyCard({ property, rentalPeriod = 'monthly' }: { property: Property, rentalPeriod?: 'monthly' | 'yearly' }) {
  const { t, formatPrice } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const displayPrice = rentalPeriod === 'yearly' ? property.price * 11 : property.price;
  const displayUnit = rentalPeriod === 'yearly' ? t('yearly') : t('monthly');

  return (
    <div className={styles.card}>
      <Link href={`/properties/${property.id}`} className={styles.cardLinkWrapper}>
        
        {/* Top Image Section */}
        <div className={styles.imageWrapper}>
          <img src={property.imageUrl} alt={property.title} className={styles.cardImage} loading="lazy" />
          
          <div className={styles.categoryBadge}>
            {property.category}
          </div>
          
          <button 
            className={`${styles.bookmarkBtn} ${isSaved ? styles.bookmarkBtnSaved : ''}`} 
            onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
          >
             <Bookmark size={16} fill={isSaved ? '#111' : 'transparent'} color={isSaved ? '#111' : '#fff'} strokeWidth={isSaved ? 0 : 2} />
          </button>
        </div>

        {/* Bottom Content Section */}
        <div className={styles.cardContent}>
           <div className={styles.headerRow}>
              <h3 className={styles.title}>{property.title}</h3>
           </div>
           
           <div className={styles.locationRow} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem' }}>
              <span style={{ 
                background: 'rgba(240, 240, 242, 0.8)', 
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                color: '#111', 
                padding: '0.25rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.75rem', 
                fontWeight: 700 
              }}>
                TRV-{property.id}
              </span>
              <div style={{ width: '1px', height: '14px', background: '#d1d1d6' }}></div>
              <span style={{ 
                background: '#f5f5f7', 
                color: '#8e8e93', 
                padding: '0.25rem 0.6rem', 
                borderRadius: '6px', 
                fontSize: '0.75rem', 
                fontWeight: 500
              }}>
                {property.location}
              </span>
           </div>
           
           <div className={styles.featuresRow}>
              <div className={styles.featureNode}>
                 <Bed size={14} color="#8E8E93" /> <span>{property.bedrooms} {t('bed')}</span>
              </div>
              <div className={styles.featureDot}>•</div>
              <div className={styles.featureNode}>
                 <Bath size={14} color="#8E8E93" /> <span>{property.bathrooms} {t('bath')}</span>
              </div>
              <div className={styles.featureDot}>•</div>
              <div className={styles.featureNode}>
                 <Waves size={14} color="#8E8E93" /> <span>{t('pool')}</span>
              </div>
              <div className={styles.featureDot}>•</div>
              <div className={styles.featureNode}>
                 <Maximize size={14} color="#8E8E93" /> <span>{property.area} m²</span>
              </div>
           </div>
           
           <div className={styles.footerRow}>
              <div className={styles.priceCol}>
                 <span className={styles.priceLabel}>{t('price')}</span>
                 <div className={styles.priceWrap}>
                    <strong>{formatPrice(displayPrice)}</strong>
                    <span className={styles.priceUnit}>{displayUnit}</span>
                 </div>
              </div>
              
              <button className={styles.arrowBtn} onClick={(e) => { e.preventDefault(); }}>
                 <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </Link>
    </div>
  );
}
