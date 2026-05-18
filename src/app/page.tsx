'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, Heart, User, Globe, ArrowUpRight, ArrowDownUp, ChevronDown, MoreHorizontal, Home, Building2, Umbrella, X } from 'lucide-react';
import Link from 'next/link';
import PropertyCard from '../components/PropertyCard';
import SmallPropertyCard from '../components/SmallPropertyCard';
import RentedPropertyCard from '../components/RentedPropertyCard';
import { mockProperties } from '../data/mockProperties';
import { mockBlogs } from '../data/mockBlogs';
import styles from './page.module.css';
import navStyles from '../components/Navigation.module.css';
import { useAppContext } from '../context/AppContext';
import type { Currency } from '../context/AppContext';
import type { Language } from '../i18n/translations';

export default function Home_Page() {
  const newProperties = mockProperties.slice(2, 6);
  const recommendedProperties = mockProperties.slice(0, 4);
  const rentedProperties = mockProperties.slice(4, 6);
  const [showFilters, setShowFilters] = useState(false);
  const [filterSearchQuery, setFilterSearchQuery] = useState('');
  const [filterPropertyType, setFilterPropertyType] = useState<string>('Any');
  const [filterMinMonthly, setFilterMinMonthly] = useState<string>('');
  const [filterMaxMonthly, setFilterMaxMonthly] = useState<string>('');
  const [filterMinYearly, setFilterMinYearly] = useState<string>('');
  const [filterMaxYearly, setFilterMaxYearly] = useState<string>('');
  const [filterBedrooms, setFilterBedrooms] = useState<string>('Any');
  const [filterAmenities, setFilterAmenities] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(500000000);

  const { language, setLanguage, currency, setCurrency, t, formatPrice } = useAppContext();

  useEffect(() => {
    setMounted(true);

    const handleOpenAdvancedFilters = () => setShowFilters(true);
    window.addEventListener('openAdvancedFilters', handleOpenAdvancedFilters);
    return () => window.removeEventListener('openAdvancedFilters', handleOpenAdvancedFilters);
  }, []);

  // Lock body scroll when filter is open
  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showFilters]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching...');
  };

  // Simulated User Auth State
  const [user] = useState<{ name: string, avatarUrl: string } | null>({
    name: "Alexander Christopher",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80"
  });

  // Smart logic for handling long names (e.g. from Google Auth)
  const getDisplayTitle = () => {
    if (!user) return 'Sign In';
    const firstName = user.name.split(' ')[0];
    return firstName.length > 10 ? firstName.substring(0, 8) + '...' : firstName;
  };

  const checkMatch = (p: typeof mockProperties[0]) => {
    if (filterSearchQuery) {
      const term = filterSearchQuery.toLowerCase();
      if (!p.id.toLowerCase().includes(term) && !p.location.toLowerCase().includes(term) && !p.title.toLowerCase().includes(term)) return false;
    }
    if (filterPropertyType !== 'Any' && p.category.toLowerCase() !== filterPropertyType.toLowerCase()) return false;
    
    const monthlyPrice = p.price;
    if (filterMinMonthly && monthlyPrice < Number(filterMinMonthly)) return false;
    if (filterMaxMonthly && monthlyPrice > Number(filterMaxMonthly)) return false;

    const yearlyPrice = p.priceYearly || (p.price * 11);
    if (filterMinYearly && yearlyPrice < Number(filterMinYearly)) return false;
    if (filterMaxYearly && yearlyPrice > Number(filterMaxYearly)) return false;

    if (filterBedrooms !== 'Any') {
      if (filterBedrooms === '4+' && p.bedrooms < 4) return false;
      if (filterBedrooms !== '4+' && p.bedrooms !== Number(filterBedrooms)) return false;
    }

    if (filterAmenities.length > 0) {
      if (filterAmenities.includes('Pool') && !p.hasPool) return false;
      const mockAms = p.amenities?.map(a => a.label) || [];
      const hasAllOtherAmenities = filterAmenities.filter(a => a !== 'Pool').every(a => mockAms.includes(a));
      if (!hasAllOtherAmenities) return false;
    }

    return true;
  };

  return (
    <>
      <div className={styles.homeLayout}>

        {/* Dark Top Section */}
        <div className={styles.darkTopSection}>
          <div className="container">

            {/* Custom Home Header */}
            <header className={styles.homeHeader}>
              <div className={styles.headerLeft}>
                {user ? (
                  <img src={user.avatarUrl} alt="Profile" className={styles.topAvatar} />
                ) : (
                  <div className={styles.topAvatarPlaceholder}>
                    <User size={20} color="#8E8E93" />
                  </div>
                )}
                <div className={styles.greetingBlock}>
                  <span className={styles.greetingSubtitle}>{user && mounted ? getGreeting() : 'Welcome to Trovestay'}</span>
                  <h2 className={styles.greetingTitle}>{mounted ? getDisplayTitle() : 'Sign In'}</h2>
                </div>
              </div>
              <div className={styles.headerRight}>
                <div className={navStyles.selectorsWrapper}>
                  <div style={{ position: 'relative' }}>
                    <button
                      type="button"
                      className={navStyles.selectorPrice}
                      onClick={() => setShowPriceFilter(true)}
                      title="Filter by Price"
                    >
                      <ArrowDownUp size={14} color="#111" />
                      <span>Price</span>
                    </button>

                    {showPriceFilter && mounted && createPortal(
                      <div className={navStyles.priceModalOverlay} onClick={() => setShowPriceFilter(false)}>
                        <div className={navStyles.priceModalContent} onClick={e => e.stopPropagation()}>
                          <div className={navStyles.priceModalHeader}>
                            <h3>Set Maximum Price</h3>
                            <button className={navStyles.priceModalClose} onClick={() => setShowPriceFilter(false)}>
                              <X size={18} />
                            </button>
                          </div>

                          <div className={navStyles.priceSliderContainer}>
                            <div className={navStyles.priceValueDisplay} style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '2rem', color: '#111' }}>
                              {formatPrice(maxPrice)}
                            </div>
                            <input
                              type="range"
                              min="1000000"
                              max="500000000"
                              step="5000000"
                              value={maxPrice}
                              onChange={(e) => setMaxPrice(Number(e.target.value))}
                              className={navStyles.slider}
                            />
                            <div className={navStyles.priceRangeLabels}>
                              <span>{formatPrice(1000000)}</span>
                              <span>{formatPrice(500000000)}+</span>
                            </div>
                          </div>

                          <button className={navStyles.priceModalApplyBtn} onClick={() => setShowPriceFilter(false)}>
                            Apply Filter
                          </button>
                        </div>
                      </div>,
                      document.body
                    )}
                  </div>
                  <div className={navStyles.separator}></div>
                  <div className={navStyles.selector}>
                    <Globe size={14} color="#111" />
                    <select className={navStyles.dropdown} value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
                      <option value="en">English</option>
                      <option value="id">Indonesian</option>
                      <option value="fr">French</option>
                      <option value="ru">Russian</option>
                      <option value="es">Spanish</option>
                    </select>
                  </div>
                  <div className={navStyles.selector}>
                    <select className={navStyles.dropdown} value={currency} onChange={(e) => setCurrency(e.target.value as Currency)}>
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </div>
            </header>

            {/* Top App Search Bar */}
            <section className={styles.topSearchSection}>
              <form className={styles.searchBar} onSubmit={handleSearch}>
                <div className={styles.searchTypeWrapper}>
                  <select
                    className={styles.searchTypeSelect}
                    value={rentalPeriod}
                    onChange={(e) => setRentalPeriod(e.target.value as 'monthly' | 'yearly')}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  <ChevronDown size={14} className={styles.searchTypeIcon} color="#111" />
                </div>
                <input type="text" placeholder={t('searchSpaces')} className={styles.searchInput} />
                <button type="submit" className={styles.searchSubmitBtn}>
                  Search
                </button>
              </form>
            </section>

            {/* Top Category Pills */}
            <section className={styles.topCategoriesSection}></section>

            {/* Campaign Area */}
            <section className={styles.heroArea}>
              <div className={styles.campaignListWrapper}>
                <div className={styles.campaignList}>
                  {mockProperties.filter(p => p.isCampaign).map(campaign => (
                    <div key={campaign.id} className={`${styles.campaignCard} ${campaign.campaignTheme === 'dark' ? styles.campaignCardDark : styles.campaignCardLight}`}>
                      <Link href={`/properties/${campaign.id}`} style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10, cursor: 'pointer' }}></Link>
                      <img src={campaign.imageUrl} alt={campaign.campaignTitle?.replace('\n', ' ')} className={styles.campaignBg} loading="lazy" />
                      <div className={styles.campaignTopRightAccent}>
                        <button className={styles.accentBtn}><Heart size={16} color="#fff" /></button>
                        <button className={styles.accentBtn}><ArrowUpRight size={16} color="#fff" /></button>
                      </div>
                      <div className={styles.campaignOverlay}>
                        <span className={campaign.campaignTheme === 'dark' ? styles.campaignBadge : styles.campaignBadgeDark}>{campaign.campaignLabel}</span>
                        <h3 className={campaign.campaignTheme === 'dark' ? styles.campaignTitle : styles.campaignTitleDark}>
                          {campaign.campaignTitle?.split('\n').map((line, i) => (
                            <span key={i}>{line}<br /></span>
                          ))}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Light Curved Overlapping Body */}
        <div className={styles.lightBottomSection}>
          <div className="container">

            {/* New Listings (Small Cards) */}
            <section className={styles.horizontalSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>{t('newListing')}</h2>
                <MoreHorizontal size={20} color="#A0A0A5" />
              </div>

              <div className={styles.smallCardScrollList}>
                {newProperties
                  .filter(p => (rentalPeriod === 'yearly' ? (p.priceYearly || p.price * 11) : p.price) <= maxPrice)
                  .filter(checkMatch)
                  .map(property => (
                  <SmallPropertyCard key={property.id} property={property} rentalPeriod={rentalPeriod} />
                ))}
              </div>
            </section>

            {/* Curated Stays Area */}
            <section className={styles.horizontalSection}>
              <div className={styles.filterHeaderRow}>
                <h2 className={styles.sectionTitle}>{t('curatedStays')}</h2>
                <MoreHorizontal size={20} color="#A0A0A5" />
              </div>

              <div className={styles.scrollList}>
                {recommendedProperties
                  .filter(p => (rentalPeriod === 'yearly' ? (p.priceYearly || p.price * 11) : p.price) <= maxPrice)
                  .filter(checkMatch)
                  .map(property => (
                  <div key={property.id} className={styles.scrollItemWrapper}>
                    <PropertyCard property={property} rentalPeriod={rentalPeriod} />
                  </div>
                ))}
              </div>
            </section>

            {/* Rented Area */}
            <section className={styles.horizontalSection}>
              <div className={styles.filterHeaderRow}>
                <h2 className={styles.sectionTitle}>{t('recentlyRented')}</h2>
                <MoreHorizontal size={20} color="#A0A0A5" />
              </div>

              <div className={styles.scrollList}>
                {rentedProperties
                  .filter(p => (rentalPeriod === 'yearly' ? (p.priceYearly || p.price * 11) : p.price) <= maxPrice)
                  .filter(checkMatch)
                  .map((property) => (
                  <div key={property.id} className={styles.scrollItemWrapper}>
                    <RentedPropertyCard property={property} rentalPeriod={rentalPeriod} />
                  </div>
                ))}
              </div>
            </section>

            {/* Blog Section */}
            <section className={styles.blogSection}>
              <div className={styles.blogHeader}>
                <h2 className={styles.sectionTitle}>Insights & Lifestyle</h2>
                <Link href="/blog" style={{ color: '#8E8E93', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>View All</Link>
              </div>

              <div className={styles.blogScroll}>
                {mockBlogs.filter(b => b.status === 'published').map(blog => (
                  <Link href={`/blog/${blog.id}`} key={blog.id} style={{ textDecoration: 'none' }}>
                    <div className={styles.blogCard}>
                      <div className={styles.blogImgWrapper}>
                        <span className={styles.blogCategoryBadge}>{blog.category}</span>
                        <img src={blog.imageUrl} alt={blog.title} className={styles.blogImg} loading="lazy" />
                      </div>
                      <div className={styles.blogContent}>
                        <div className={styles.blogMeta}>
                          <span>{blog.date}</span>
                        </div>
                        <h3 className={styles.blogTitle}>{blog.title}</h3>
                        <p className={styles.blogSummary}>{blog.summary}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <div style={{ height: '100px' }}></div>
          </div>
        </div>
      </div>

      {/* Advanced Filter Panel — rendered via Portal to escape all stacking contexts */}
      {mounted && showFilters && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
          {/* Dark overlay */}
          <div
            className={styles.advancedFilterPanelOverlay}
            onClick={() => setShowFilters(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 999998 }}
          />

          {/* Bottom sheet */}
          <div className={styles.advancedFilterPanel} style={{ zIndex: 999999 }}>
            <div className={styles.mobileSheetHeader}>
              <h3>Advanced Filters</h3>
              <button onClick={() => setShowFilters(false)} className={styles.closeSheetBtn}>
                <X size={18} color="#666" />
              </button>
            </div>

            <div className={styles.filterScrollArea}>
              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Property ID or Location</h4>
                <div className={styles.searchWrapper}>
                  <Search size={16} color="#8E8E93" />
                  <input 
                    type="text" 
                    placeholder="e.g. 1 or Canggu" 
                    className={styles.priceInput} 
                    style={{ flex: 1 }}
                    value={filterSearchQuery}
                    onChange={(e) => setFilterSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.filterGroup}>
                <h4 className={styles.filterLabel}>Property Type</h4>
                <div className={styles.categoryScroll}>
                  {['Any', 'Villa', 'Apartment', 'Beachfront', 'Jungle'].map(type => (
                    <button 
                      key={type}
                      className={`${styles.categoryPill} ${filterPropertyType === type ? styles.categoryPillActive : ''}`}
                      onClick={() => setFilterPropertyType(type)}
                    >
                      {type === 'Villa' ? <Home size={16} /> : type === 'Apartment' ? <Building2 size={16} /> : type !== 'Any' ? <Umbrella size={16} /> : null} 
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <h4 className={styles.filterLabel}>Monthly Price</h4>
                  <div className={styles.priceInputs}>
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>Rp</span>
                      <input 
                        type="number" 
                        placeholder="Min" 
                        className={styles.priceInput}
                        value={filterMinMonthly}
                        onChange={(e) => setFilterMinMonthly(e.target.value)}
                      />
                    </div>
                    <span className={styles.priceDivider}>—</span>
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>Rp</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        className={styles.priceInput}
                        value={filterMaxMonthly}
                        onChange={(e) => setFilterMaxMonthly(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <h4 className={styles.filterLabel}>Yearly Price</h4>
                  <div className={styles.priceInputs}>
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>Rp</span>
                      <input 
                        type="number" 
                        placeholder="Min" 
                        className={styles.priceInput}
                        value={filterMinYearly}
                        onChange={(e) => setFilterMinYearly(e.target.value)}
                      />
                    </div>
                    <span className={styles.priceDivider}>—</span>
                    <div className={styles.priceWrapper}>
                      <span className={styles.currency}>Rp</span>
                      <input 
                        type="number" 
                        placeholder="Max" 
                        className={styles.priceInput}
                        value={filterMaxYearly}
                        onChange={(e) => setFilterMaxYearly(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.filterRow}>
                <div className={styles.filterGroup}>
                  <h4 className={styles.filterLabel}>Bedrooms</h4>
                  <div className={styles.bedOptions}>
                    {['Any', '1', '2', '3', '4+'].map(val => (
                      <button 
                        key={val} 
                        className={`${styles.bedBtn} ${filterBedrooms === val ? styles.bedBtnActive : ''}`}
                        onClick={() => setFilterBedrooms(val)}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <h4 className={styles.filterLabel}>Amenities</h4>
                  <div className={styles.bedOptions} style={{ flexWrap: 'wrap', gap: '8px' }}>
                    {['Pool', 'WiFi', 'Gym', 'Parking', 'AC', 'Workspace', 'Kitchen', 'Balcony', 'Pet Friendly'].map(amenity => (
                      <button 
                        key={amenity}
                        className={`${styles.bedBtn} ${filterAmenities.includes(amenity) ? styles.bedBtnActive : ''}`} 
                        style={{ width: 'auto', padding: '0 1rem', borderRadius: 'var(--radius-full)' }}
                        onClick={() => {
                          if (filterAmenities.includes(amenity)) {
                            setFilterAmenities(filterAmenities.filter(a => a !== amenity));
                          } else {
                            setFilterAmenities([...filterAmenities, amenity]);
                          }
                        }}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.filterActions}>
              <button 
                className={styles.clearBtn} 
                onClick={() => {
                  setFilterSearchQuery('');
                  setFilterPropertyType('Any');
                  setFilterMinMonthly('');
                  setFilterMaxMonthly('');
                  setFilterMinYearly('');
                  setFilterMaxYearly('');
                  setFilterBedrooms('Any');
                  setFilterAmenities([]);
                }}
              >
                Clear all
              </button>
              <button className={styles.applyBtn} onClick={() => setShowFilters(false)}>Show properties</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
