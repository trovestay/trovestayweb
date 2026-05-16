'use client';

import Link from 'next/link';
import { Bookmark, MapPin } from 'lucide-react';
import styles from './SmallPropertyCard.module.css';
import type { Property } from '../data/mockProperties';
import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export default function SmallPropertyCard({ property, rentalPeriod = 'monthly' }: { property: Property, rentalPeriod?: 'monthly' | 'yearly' }) {
  const { t, formatPrice } = useAppContext();
  const [isSaved, setIsSaved] = useState(false);
  const displayPrice = rentalPeriod === 'yearly' ? property.price * 11 : property.price;
  const displayUnit = rentalPeriod === 'yearly' ? t('yearly') : t('monthly');

  return (
    <div className={styles.smallCard}>
      <Link href={`/properties/${property.id}`} className={styles.cardLink}>
        <div className={styles.imageBox}>
           <img src={property.imageUrl} alt={property.title} className={styles.image} loading="lazy" />
           <button 
             className={`${styles.bookmarkBtn} ${isSaved ? styles.bookmarkBtnSaved : ''}`} 
             onClick={(e) => { e.preventDefault(); setIsSaved(!isSaved); }}
           >
              <Bookmark size={14} fill={isSaved ? '#111' : 'transparent'} color={isSaved ? '#111' : '#fff'} strokeWidth={isSaved ? 0 : 2} />
           </button>
        </div>
        <div className={styles.contentBox}>
           <h4 className={styles.title}>{property.title}</h4>
           <div className={styles.locationRow}>
              <MapPin size={12} color="#8E8E93" />
              <span>{property.location}</span>
           </div>
           <strong className={styles.price}>{formatPrice(displayPrice)} <span className={styles.unit}>{displayUnit}</span></strong>
        </div>
      </Link>
    </div>
  );
}
