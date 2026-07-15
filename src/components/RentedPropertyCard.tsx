'use client';

import { Bookmark, Star, ArrowRight, Bed, Bath, Waves, Maximize, CalendarClock } from 'lucide-react';
import Link from 'next/link';
import styles from './RentedPropertyCard.module.css';
import type { Property } from '../types/property';
import { useAppContext } from '../context/AppContext';
import { useSavedProperties } from '../context/SavedPropertiesContext';

export default function RentedPropertyCard({ property, rentalPeriod = 'monthly' }: { property: Property, rentalPeriod?: 'monthly' | 'yearly' }) {
  const { t, formatPrice } = useAppContext();
  const { isSaved, toggleSave } = useSavedProperties();
  const availableMonth = property.availableFrom || 'Soon';
  const displayPrice = rentalPeriod === 'yearly' ? property.price * 11 : property.price;
  const displayUnit = rentalPeriod === 'yearly' ? t('yearly') : t('monthly');
  
  return (
    <div className={styles.card}>
      <Link href={`/properties/${property.id}`} className={styles.cardLinkWrapper}>
        
        {/* Full Image Background */}
        <div className={styles.imageWrapper}>
          <img src={property.imageUrl} alt={property.title} className={styles.cardImage} loading="lazy" />
          
          <div className={styles.imageOverlay}></div>
          
          {/* Availability Badge */}
          <div className={styles.availabilityBadge}>
            <CalendarClock size={14} color="var(--color-primary)" />
            <span>Available {availableMonth}</span>
          </div>
          
          {/* Bottom Content Overlay */}
          <div className={styles.contentOverlay}>
            <div className={styles.headerRow}>
               <h3 className={styles.title}>{property.title}</h3>
               <span className={styles.price}>{formatPrice(displayPrice)}<small>{displayUnit}</small></span>
            </div>
            
            <div className={styles.locationRow}>
               <span className={styles.location}>{property.location}</span>
               <span className={styles.featureDot}>•</span>
               <span className={styles.propertyCode}>ID: TRV-{property.id}</span>
            </div>
            
            <button 
              className={`${styles.bookmarkBtn} ${isSaved(property.id) ? styles.bookmarkBtnSaved : ''}`} 
              onClick={(e) => { e.preventDefault(); toggleSave(property.id); }}
            >
               <Bookmark size={16} fill={isSaved(property.id) ? '#111' : 'transparent'} color={isSaved(property.id) ? '#111' : '#fff'} strokeWidth={isSaved(property.id) ? 0 : 2} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
