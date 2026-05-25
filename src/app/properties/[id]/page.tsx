'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, Star, MapPin, Compass, Bed, Bath, Waves, Maximize, Users, ChevronDown, Tag, Clock, Mail, ShieldCheck, UserCheck, CalendarClock, Wifi, Coffee, Car, ShieldAlert, CheckCircle, Info, Sparkles, MessageCircle, Phone, Video, Zap, Trees, Wrench, Bug, Landmark } from 'lucide-react';
import { Property, mockProperties } from '../../../data/mockProperties';
import { supabase } from '../../../lib/supabaseClient';
import BookingFlowModal from '../../../components/BookingFlowModal';
import Map from '../../../components/Map';
import PropertyCard from '../../../components/PropertyCard';
import styles from './PropertyDetail.module.css';
import { notFound } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';

export default function PropertyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { t, formatPrice, currency } = useAppContext();
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [isAmenitiesExpanded, setIsAmenitiesExpanded] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
          imageUrl: '',
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
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'var(--font-primary)' }}>Loading details...</div>;
  }

  if (!property && !loading) {
    notFound();
  }

  const carouselImages = [
    property.imageUrl,
    "",
    "",
    "",
    ""
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
        <button className={styles.iconBtn}>
           <Bookmark size={20} color="var(--color-primary)" fill="transparent" />
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

            {/* Desktop Photo Grid */}
            <div className={styles.desktopPhotoGrid}>
              <div className={`${styles.gridImgWrapper} ${styles.gridHero}`}>
                {videoId ? (
                   <iframe 
                     src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                     title="YouTube video player"
                     frameBorder="0"
                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                     allowFullScreen
                     style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, borderRadius: '24px 0 0 24px' }}
                   ></iframe>
                ) : (
                  <img src={carouselImages[0]} alt="Hero" className={styles.gridImg} />
                )}
              </div>
              <div className={styles.gridImgWrapper}>
                <img src={carouselImages[1]} alt="Gallery 1" className={styles.gridImg} />
              </div>
              <div className={styles.gridImgWrapper}>
                <img src={carouselImages[2]} alt="Gallery 2" className={styles.gridImg} style={{ borderTopRightRadius: '24px' }} />
              </div>
              <div className={styles.gridImgWrapper}>
                <img src={carouselImages[3]} alt="Gallery 3" className={styles.gridImg} />
              </div>
              <div className={styles.gridImgWrapper}>
                <img src={carouselImages[4]} alt="Gallery 4" className={styles.gridImg} style={{ borderBottomRightRadius: '24px' }} />
              </div>
            </div>
         </div>
      </div>

      <main className={`container ${styles.desktopGrid}`}>
        
        {/* Left Column (Content) */}
        <div className={styles.leftColumn}>

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
                   <h1 className={styles.title}>{property.title}</h1>
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

        {/* Right Column (Desktop Sticky Booking Widget) */}
        <div className={styles.rightColumn}>
           <div className={styles.stickyWidget}>
               
               {/* Live Rates Header */}
               <div className={styles.widgetLiveRates}>
                  <div className={styles.liveRatesLeft}>
                     <div className={styles.greenDot}></div>
                     <div className={styles.liveRatesText}>
                        <strong>{t('liveRates')}</strong>
                        <span>{t('verifiedVia')}</span>
                     </div>
                  </div>
                  <div className={styles.currencySelect}>
                     {currency} <ChevronDown size={14} />
                  </div>
               </div>

               {/* Price Area */}
               <div className={styles.widgetPriceArea}>
                  <div className={styles.priceLabel}>
                     <Tag size={12} color="#8E8E93" />
                     <span>{billingCycle === 'yearly' ? t('yearlyRent') : t('monthlyRent')}</span>
                  </div>
                  <div className={styles.widgetPriceLarge}>
                     <strong>{formatPrice(billingCycle === 'yearly' ? property.price * 10 : property.price)}</strong> <span>{billingCycle === 'yearly' ? t('yearly') : t('monthly')}</span>
                  </div>
                  <p className={styles.priceDisclaimer}>
                     * {billingCycle === 'yearly' ? 'Yearly rent excludes utilities. 1-month deposit required.' : 'Monthly rent includes pool & garden maintenance.'}
                  </p>
               </div>

               {/* Lead Gen Booking Actions */}
               <div className={styles.leadGenActions}>
                 <BookingFlowModal property={property} billingCycle={billingCycle}>
                   <button className={styles.desktopBookBtn}>
                      <CalendarClock size={16} /> Request Viewing
                   </button>
                 </BookingFlowModal>
               </div>

               {/* Trust Badges */}
               <div className={styles.trustBadges}>
                  <div className={styles.trustBadge}>
                     <ShieldCheck size={18} color="#D4FF00" className={styles.trustIcon} style={{ background: '#111' }} />
                     <div className={styles.trustText}>
                        <strong>Secure Booking Guarantee</strong>
                        <span>Your payment and identity are fully protected by our secure platform.</span>
                     </div>
                  </div>
                  <div className={styles.trustBadge}>
                     <CheckCircle size={18} color="#333" className={styles.trustIcon} />
                     <div className={styles.trustText}>
                        <strong>Verified Listing</strong>
                        <span>Personally inspected for quality assurance and accuracy.</span>
                     </div>
                  </div>
                  <div className={styles.trustBadge}>
                     <UserCheck size={18} color="#333" className={styles.trustIcon} />
                     <div className={styles.trustText}>
                        <strong>Direct Service</strong>
                        <span>Direct communication with the listing agent. No intermediaries.</span>
                     </div>
                  </div>
               </div>
           </div>
        </div>
      </main>

      {/* Similar Properties Section */}
      <div className="container" style={{ padding: '0 1.5rem 6rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#111', letterSpacing: '-0.02em' }}>Similar Properties</h2>
        <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem', scrollSnapType: 'x mandatory', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
           {mockProperties.filter(p => p.id !== property.id && (p.category === property.category || p.location === property.location)).slice(0, 3).map(similarProperty => (
              <div key={similarProperty.id} style={{ minWidth: '320px', width: '320px', scrollSnapAlign: 'start' }}>
                 <PropertyCard property={similarProperty} />
              </div>
           ))}
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
