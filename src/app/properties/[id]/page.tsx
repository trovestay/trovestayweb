'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Star, MapPin, Compass, Bed, Bath, Waves, Maximize, Users, ChevronDown, Tag, Clock, Mail, ShieldCheck, UserCheck, CalendarClock, Wifi, Coffee, Car, ShieldAlert, CheckCircle, Info, Sparkles, MessageCircle, Phone, Video, Zap, Trees, Wrench, Bug, Landmark, ChevronLeft, ChevronRight } from 'lucide-react';
import { Property, mockProperties } from '../../../data/mockProperties';
import { supabase } from '../../../lib/supabaseClient';
import BookingFlowModal from '../../../components/BookingFlowModal';
import Map from '../../../components/Map';
import PropertyCard from '../../../components/PropertyCard';
import SmallPropertyCard from '../../../components/SmallPropertyCard';
import SidebarPropertyCard from '../../../components/SidebarPropertyCard';
import styles from './PropertyDetail.module.css';
import { notFound } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';
import { useSavedProperties } from '../../../context/SavedPropertiesContext';

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { t, formatPrice, currency } = useAppContext();
  const { isSaved, toggleSave } = useSavedProperties();
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('slug', resolvedParams.id)
        .single();
        
      if (!error && data) {
        setProperty({
          id: data.slug || data.id,
          title: data.title,
          location: data.location_name,
          price: Number(data.monthly_price) || 0,
          priceYearly: Number(data.yearly_price) || 0,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          guests: data.guests,
          area: data.area_sqm,
          hasPool: data.has_pool,
          category: 'Villa',
          status: data.status,
          isRented: data.is_rented,
          imageUrl: '/placeholder.jpg',
          listingType: data.listing_type,
          salePrice: data.sale_price,
          youtubeUrl: data.youtube_url,
          isCampaign: data.is_campaign,
          campaignLabel: data.campaign_label,
          campaignTitle: data.campaign_title,
          campaignTheme: data.campaign_theme,
          description: data.description
        });
      }
      setLoading(false);
    };
    
    fetchProperty();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <div className={styles.detailLayout} style={{ background: 'var(--color-background)', minHeight: '100vh' }}>
        <div className="mobile-only-skeleton" style={{ position: 'absolute', top: '1rem', width: '100%', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
           <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e5e5ea', animation: 'pulse 1.5s infinite' }}></div>
           <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#e5e5ea', animation: 'pulse 1.5s infinite' }}></div>
        </div>
        
        <div className="desktop-only-skeleton" style={{ height: '8rem' }}></div>

        <main className={`container ${styles.desktopGrid}`}>
          <div className={styles.leftColumn}>
            <div className="skeleton-image" style={{ width: '100%', background: '#e5e5ea', animation: 'pulse 1.5s infinite', marginBottom: '2rem' }}></div>
            
            <div style={{ padding: '0 1.5rem' }} className="skeleton-content-padding">
              <div style={{ width: '25%', height: 24, background: '#e5e5ea', borderRadius: 8, marginBottom: '0.75rem', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ width: '70%', height: 36, background: '#e5e5ea', borderRadius: 8, marginBottom: '1.25rem', animation: 'pulse 1.5s infinite' }}></div>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <div style={{ width: 80, height: 32, background: '#e5e5ea', borderRadius: 16, animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: 80, height: 32, background: '#e5e5ea', borderRadius: 16, animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: 80, height: 32, background: '#e5e5ea', borderRadius: 16, animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ width: 80, height: 32, background: '#e5e5ea', borderRadius: 16, animation: 'pulse 1.5s infinite' }}></div>
              </div>

              <div style={{ width: '100%', height: 100, background: '#e5e5ea', borderRadius: 12, marginBottom: '2rem', animation: 'pulse 1.5s infinite' }}></div>
              <div style={{ width: '100%', height: 150, background: '#e5e5ea', borderRadius: 12, marginBottom: '2rem', animation: 'pulse 1.5s infinite' }}></div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className="desktop-only-skeleton" style={{ width: '100%', height: 400, background: '#e5e5ea', borderRadius: 24, animation: 'pulse 1.5s infinite' }}></div>
          </div>
        </main>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
          .skeleton-image { aspect-ratio: 16/9; border-radius: 0; }
          @media (min-width: 1024px) {
            .mobile-only-skeleton { display: none !important; }
            .skeleton-image { border-radius: 24px; }
            .skeleton-content-padding { padding: 0 !important; }
          }
          @media (max-width: 1023px) {
            .desktop-only-skeleton { display: none !important; }
            main.container { padding-left: 0; padding-right: 0; }
          }
        `}} />
      </div>
    );
  }

  if (!property && !loading) {
    notFound();
  }

  const carouselImages = [
    property.imageUrl,
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg",
    "/placeholder.jpg"
  ];

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = property.youtubeUrl ? getYoutubeId(property.youtubeUrl) : null;

  return (
    <>
    <div className={styles.detailLayout}>
      
      {/* Top Header Actions */}
      <header className={styles.topHeader}>
        <Link href="/" className={styles.iconBtn}>
           <ArrowLeft size={20} color="var(--color-primary)" />
        </Link>
        <button className={styles.iconBtn} onClick={() => toggleSave(property.id)}>
           <Bookmark size={20} color={isSaved(property.id) ? '#111' : "var(--color-primary)"} fill={isSaved(property.id) ? '#111' : "transparent"} strokeWidth={isSaved(property.id) ? 0 : 2} />
        </button>
      </header>

      <div className={styles.fullWidthCarouselContainer}>
         <div className={styles.carouselContainer}>
            {/* Mobile Carousel */}
            <div className={styles.carouselScroll}>
               {carouselImages.map((img, index) => (
                 index === 0 && videoId ? (
                   <div key={index} className={styles.carouselImage} style={{ minWidth: '100%', position: 'relative', height: 'auto', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
                     <iframe 
                       src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                       title="YouTube video player"
                       frameBorder="0"
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                       allowFullScreen
                       style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, transition: 'transform 0.3s ease-out' }}
                     ></iframe>
                   </div>
                 ) : (
                   <img key={index} src={img} alt={`Slide ${index}`} className={styles.carouselImage} />
                 )
               ))}
            </div>
         </div>
      </div>

      <main className={`container ${styles.desktopGrid}`}>
        
        {/* Left Column (Content) */}
        <div className={styles.leftColumn}>

          {/* Desktop Media Player (YouTube Style) */}
          <div className={styles.desktopMediaContainer}>
             <button 
               className={`${styles.mediaNavBtn} ${styles.mediaNavLeft}`}
               onClick={() => setCurrentMediaIndex((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))}
             >
               <ChevronLeft size={24} color="#111" />
             </button>
             <button 
               className={`${styles.mediaNavBtn} ${styles.mediaNavRight}`}
               onClick={() => setCurrentMediaIndex((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))}
             >
               <ChevronRight size={24} color="#111" />
             </button>

             {currentMediaIndex === 0 && videoId ? (
                <iframe 
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.mediaItem}
                ></iframe>
             ) : (
                <img src={carouselImages[currentMediaIndex]} alt="Property View" className={styles.mediaItem} />
             )}
          </div>

          {/* Title & Specs Row */}
          <div className={styles.headerInfo}>
             <div className={styles.titleSection}>
                <div className={styles.titleRow}>
                   <div className={styles.badgeToggleRow}>
                     <div className={styles.statusBadge}>
                       <span>{property.availableFrom ? `AVAILABLE FROM ${property.availableFrom.toUpperCase()}` : 'AVAILABLE NOW'}</span>
                     </div>
                     {property.availableFrom ? (
                       <div className={styles.billingSelectContainer}>
                          <select 
                            className={styles.billingSelect}
                            value={billingCycle}
                            onChange={(e) => setBillingCycle(e.target.value as 'monthly' | 'yearly')}
                          >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                          </select>
                          <ChevronDown size={14} className={styles.selectIcon} />
                       </div>
                     ) : (
                       <div className={styles.billingToggle}>
                          <button 
                            className={billingCycle === 'monthly' ? styles.toggleBtnActive : styles.toggleBtn}
                            onClick={() => setBillingCycle('monthly')}
                          >
                            Monthly
                          </button>
                          <button 
                            className={billingCycle === 'yearly' ? styles.toggleBtnActive : styles.toggleBtn}
                            onClick={() => setBillingCycle('yearly')}
                          >
                            Yearly
                          </button>
                       </div>
                     )}
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                     <h1 className={styles.title}>{property.title}</h1>
                     <button className="desktop-only-save-btn" onClick={() => toggleSave(property.id)} style={{ background: 'var(--color-surface)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', display: 'none', padding: '0.5rem', borderRadius: '50%', width: '44px', height: '44px', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.2s' }}>
                        <Bookmark size={20} color={isSaved(property.id) ? '#111' : "var(--color-primary)"} fill={isSaved(property.id) ? '#111' : "transparent"} strokeWidth={isSaved(property.id) ? 0 : 2} />
                     </button>
                   </div>
                </div>
                
                 <div className={styles.locationPill}>
                    <MapPin size={16} color="#4A4A4A" />
                    <span>{property.location}</span>
                 </div>

                 {/* Property Specs (Bed, Bath, Area) */}
                 <div className={styles.propertySpecsScroll}>
                    <div className={styles.specCard}>
                       <Bed size={16} color="#111" />
                       <span>{property.bedrooms || 3} Bed</span>
                    </div>
                    <div className={styles.specCard}>
                       <Bath size={16} color="#111" />
                       <span>{property.bathrooms || 3} Bath</span>
                    </div>
                    <div className={styles.specCard}>
                       <Maximize size={16} color="#111" />
                       <span>{property.area || 240} m²</span>
                    </div>
                    <div className={styles.specCard}>
                       <Users size={16} color="#111" />
                       <span>{property.guests || 6} Guests</span>
                    </div>
                 </div>
             </div>
          </div>



          {/* About Section */}
          <section className={styles.aboutSection}>
             <p className={styles.description}>
                {property.title} offers an exclusive balance of modern architecture and tropical comfort. Perfectly situated in the heart of {property.location}, featuring high-end amenities and an unforgettable experience. This property is designed for those who appreciate fine living and seamless integration with nature. 
                {isDescExpanded ? (
                   <>
                     <br/><br/>
                     The interior space is carefully curated with bespoke furniture and state-of-the-art appliances to ensure maximum comfort during your stay. Expansive floor-to-ceiling windows invite abundant natural light, blurring the lines between indoor luxury and outdoor tropical bliss. 
                     <br/><br/>
                     Whether you are looking for a serene retreat or an elegant space for entertaining, this property delivers on all fronts with uncompromised privacy and a dedicated concierge team available to cater to your needs.
                     <span className={styles.readMore} onClick={() => setIsDescExpanded(false)}>Read Less</span>
                   </>
                ) : (
                   <span className={styles.readMore} onClick={() => setIsDescExpanded(true)}>... Read More</span>
                )}
             </p>
          </section>

          {/* Amenities Grid */}
          <section className={styles.amenitiesSection}>
             <h2 className={styles.sectionTitle}>What this place offers</h2>
             <div className={styles.amenitiesGrid}>
                <div className={styles.amenityItem}>
                   <Waves size={20} color="#111" />
                   <span>Private Pool</span>
                </div>
                <div className={styles.amenityItem}>
                   <Wifi size={20} color="#111" />
                   <span>Fast Wi-Fi</span>
                </div>
                <div className={styles.amenityItem}>
                   <Coffee size={20} color="#111" />
                   <span>Fully Equipped Kitchen</span>
                </div>
                <div className={styles.amenityItem}>
                   <Car size={20} color="#111" />
                   <span>Free Parking on Premises</span>
                </div>
                
                {/* Expanded Amenities */}
                {isAmenitiesExpanded && (
                  <>
                    <div className={styles.amenityItem}>
                       <ShieldCheck size={20} color="#111" />
                       <span>24/7 Security</span>
                    </div>
                    <div className={styles.amenityItem}>
                       <Star size={20} color="#111" />
                       <span>Daily Housekeeping</span>
                    </div>
                    <div className={styles.amenityItem}>
                       <Bed size={20} color="#111" />
                       <span>Premium Linens</span>
                    </div>
                    <div className={styles.amenityItem}>
                       <Info size={20} color="#111" />
                       <span>Dedicated Workspace</span>
                    </div>
                  </>
                )}
             </div>
             <span className={styles.readMore} onClick={() => setIsAmenitiesExpanded(!isAmenitiesExpanded)} style={{ display: 'inline-block', marginTop: '1rem' }}>
                {isAmenitiesExpanded ? 'Less amenities' : 'More amenities'}
             </span>
          </section>

          {/* Inclusion & Exclusion */}
          <section className={styles.inclusionSection}>
             <h2 className={styles.sectionTitle}>Inclusion & Exclusion</h2>
             <div className={styles.inclusionList}>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Zap size={18} color="#8E8E93" />
                      <span>Utilities (Electricity, water)</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Bed size={18} color="#8E8E93" />
                      <span>Weekly Linen Change</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Sparkles size={18} color="#8E8E93" />
                      <span>Weekly Cleaning</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Trees size={18} color="#8E8E93" />
                      <span>Pool & Garden Maintenance</span>
                   </div>
                   <span className={styles.badgeIncluded}>Included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Wrench size={18} color="#8E8E93" />
                      <span>Minor Repairs</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Bug size={18} color="#8E8E93" />
                      <span>Pest Control</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Wifi size={18} color="#8E8E93" />
                      <span>Internet</span>
                   </div>
                   <span className={styles.badgeIncluded}>Included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Coffee size={18} color="#8E8E93" />
                      <span>Breakfast</span>
                   </div>
                   <span className={styles.badgeNotIncluded}>Not included</span>
                </div>
                <div className={styles.inclusionRow}>
                   <div className={styles.inclusionLeft}>
                      <Landmark size={18} color="#8E8E93" />
                      <span>Banjar Fees</span>
                   </div>
                   <span className={styles.badgeIncluded}>Included</span>
                </div>
             </div>
          </section>

          {/* Places Nearby */}
          {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
            <section className={styles.inclusionSection} style={{ marginTop: '2.5rem' }}>
               <h2 className={styles.sectionTitle}>Places Nearby</h2>
               <div className={styles.inclusionList} style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  {property.nearbyPlaces.map((place) => (
                    <div key={place.id} className={styles.inclusionRow} style={{ padding: '1rem', background: '#f9f9fb', borderRadius: '12px', border: '1px solid #e8e8ec' }}>
                       <div className={styles.inclusionLeft}>
                          <MapPin size={18} color="#8E8E93" />
                          <div>
                            <div style={{ fontWeight: 600, color: '#111', fontSize: '0.95rem' }}>{place.name}</div>
                            <div style={{ color: '#8E8E93', fontSize: '0.85rem' }}>{place.type}</div>
                          </div>
                       </div>
                       <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111' }}>{place.distance}</span>
                    </div>
                  ))}
               </div>
            </section>
          )}

          {/* Reviews section deleted per user request for B2B/high-end lead gen */}
          <section className={styles.mapSection}>
             <div className={styles.mapSectionHeader}>
               <h2 className={styles.sectionTitle}>{t('whereYoullBe')}</h2>
             </div>
             <div className={styles.mapContainer}>
                <Link href="/locations" style={{ display: 'block', width: '100%', height: '100%', cursor: 'pointer' }}>
                   <Map properties={[property]} center={property.lat && property.lng ? [property.lat, property.lng] : undefined} zoom={15} interactive={false} />
                </Link>
             </div>
          </section>
          
          <div className={styles.mobileSpacer}></div>
        </div>

        {/* Right Column (Desktop Sidebar Similar Properties) */}
        <div className={styles.rightColumn}>
           <div className={styles.sidebarSimilarList} style={{ display: 'none' /* Will be unhidden via css for desktop */ }}>
              <div className={styles.similarPropertiesHeader}>
                 <h3 className={styles.sidebarSimilarTitle}>Similar Properties</h3>
                 <div className={styles.billingToggle}>
                    <button 
                      className={billingCycle === 'monthly' ? styles.toggleBtnActive : styles.toggleBtn}
                      onClick={() => setBillingCycle('monthly')}
                    >
                      Monthly
                    </button>
                    <button 
                      className={billingCycle === 'yearly' ? styles.toggleBtnActive : styles.toggleBtn}
                      onClick={() => setBillingCycle('yearly')}
                    >
                      Yearly
                    </button>
                 </div>
              </div>
              {mockProperties.filter(p => p.id !== property.id).slice(0, 4).map(similarProperty => (
                 <SidebarPropertyCard key={similarProperty.id} property={similarProperty} rentalPeriod={billingCycle} />
              ))}
           </div>
        </div>
      </main>

      {/* Similar Properties Section (Mobile Only) */}
      <div className="container" style={{ padding: '0 1.5rem 6rem 1.5rem', display: 'block' /* Will be hidden via css for desktop */ }}>
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1024px) {
            .mobile-similar { display: none !important; }
            .${styles.sidebarSimilarList} { display: flex !important; }
            .desktop-only-save-btn { display: flex !important; }
          }
        `}} />
        <div className="mobile-similar">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '2rem 0 1.5rem 0', color: '#111', letterSpacing: '-0.02em' }}>Similar Properties</h2>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
             {mockProperties.filter(p => p.id !== property.id).slice(0, 4).map(similarProperty => (
                <div key={similarProperty.id} style={{ minWidth: '320px', width: '320px', scrollSnapAlign: 'start' }}>
                   <PropertyCard property={similarProperty} />
                </div>
             ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA Mobile */}
      <div className={styles.mobileStickyBottom}>
         <div className={styles.mobileStickyPrice}>
            <strong>{formatPrice(billingCycle === 'yearly' ? property.price * 10 : property.price)}</strong>
            <span>{billingCycle === 'yearly' ? t('yearly') : t('monthly')}</span>
         </div>
         <BookingFlowModal property={property} billingCycle={billingCycle}>
           <button className={styles.mobileStickyBtn}>
              Request Viewing
           </button>
         </BookingFlowModal>
      </div>

    </div>
    </>
  );
}
