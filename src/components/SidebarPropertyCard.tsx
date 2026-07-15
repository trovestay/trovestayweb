'use client';

import { Bookmark, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import Link from 'next/link';
import styles from './SidebarPropertyCard.module.css';
import type { Property } from '../types/property';
import { useAppContext } from '../context/AppContext';
import { useSavedProperties } from '../context/SavedPropertiesContext';

export default function SidebarPropertyCard({ property, rentalPeriod = 'monthly' }: { property: Property, rentalPeriod?: 'monthly' | 'yearly' }) {
  const { t, formatPrice } = useAppContext();
  const { isSaved, toggleSave } = useSavedProperties();
  const displayPrice = rentalPeriod === 'yearly' ? property.price * 11 : property.price;
  const displayUnit = rentalPeriod === 'yearly' ? t('yearly') : t('monthly');

  return (
    <div className={styles.card}>
      <Link href={`/properties/${property.id}`} className={styles.cardLinkWrapper}>
        <div className={styles.imageWrapper}>
          <img src={property.imageUrl} alt={property.title} className={styles.cardImage} loading="lazy" />
          <button 
            className={styles.bookmarkBtn} 
            onClick={(e) => { e.preventDefault(); toggleSave(property.id); }}
          >
             <Bookmark size={14} fill={isSaved(property.id) ? '#111' : 'transparent'} color={isSaved(property.id) ? '#111' : '#111'} strokeWidth={isSaved(property.id) ? 0 : 2} />
          </button>
        </div>

        <div className={styles.cardContent}>
           <h3 className={styles.title}>{property.title}</h3>
           <div className={styles.locationRow}>
              <MapPin size={12} color="#8E8E93" />
              <span>{property.location}</span>
           </div>
           
           <div className={styles.featuresRow}>
              <div className={styles.featureItem}><Bed size={16} strokeWidth={1.5} color="#8E8E93" /> <span>{property.bedrooms} Bed</span></div>
              <span className={styles.featureDot}>•</span>
              <div className={styles.featureItem}><Bath size={16} strokeWidth={1.5} color="#8E8E93" /> <span>{property.bathrooms} Bath</span></div>
              <span className={styles.featureDot}>•</span>
              <div className={styles.featureItem}><Maximize size={16} strokeWidth={1.5} color="#8E8E93" /> <span>{property.area} m²</span></div>
           </div>
           
           <div className={styles.footerRow}>
              <div className={styles.priceCol}>
                 <div className={styles.priceWrap}>
                    <strong>{formatPrice(displayPrice)}</strong>
                    <span className={styles.priceUnit}>{displayUnit}</span>
                 </div>
              </div>
           </div>
        </div>
      </Link>
    </div>
  );
}
