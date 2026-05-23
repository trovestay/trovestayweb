'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Upload,
  Save,
  Image as ImageIcon,
  Wifi, Coffee, Car, ShieldCheck, Star, Bed, Info, Zap, Trees, Wrench, Bug, Landmark,
  Tv, Dumbbell, Wind, FileText, CalendarClock, ShieldAlert,
  Waves, Eye, Bath, Home, UserCheck, Plus, X, MapPin
} from 'lucide-react';
import { PropertyFeature, NearbyPlace, mockProperties } from '../../../../../data/mockProperties';
import { updateProperty } from '../../../../actions/propertyActions';
import styles from '../../new/form.module.css';

const categories = ['Villa', 'Apartment', 'Beachfront', 'Jungle', 'Penthouse', 'Studio'];

const STANDARD_AMENITIES = [
  { id: 'pool', label: 'Private Pool', icon: Waves },
  { id: 'ocean_view', label: 'Ocean View', icon: Eye },
  { id: 'garden', label: 'Lush Garden', icon: Trees },
  { id: 'bathtub', label: 'Bathtub', icon: Bath },
  { id: 'gazebo', label: 'Gazebo / Bale', icon: Home },
  { id: 'chef', label: 'Private Chef', icon: UserCheck },
  { id: 'wifi', label: 'Fast Wi-Fi', icon: Wifi },
  { id: 'kitchen', label: 'Fully Equipped Kitchen', icon: Coffee },
  { id: 'parking', label: 'Free Parking', icon: Car },
  { id: 'security', label: '24/7 Security', icon: ShieldCheck },
  { id: 'housekeeping', label: 'Daily Housekeeping', icon: Star },
  { id: 'linens', label: 'Premium Linens', icon: Bed },
  { id: 'workspace', label: 'Dedicated Workspace', icon: Info },
  { id: 'tv', label: 'Smart TV', icon: Tv },
  { id: 'gym', label: 'Gym Access', icon: Dumbbell },
  { id: 'ac', label: 'Air Conditioning', icon: Wind }
];

const STANDARD_INCLUSIONS = [
  { id: 'utilities', label: 'Utilities (Electricity, water)', icon: Zap },
  { id: 'linen_change', label: 'Weekly Linen Change', icon: Bed },
  { id: 'cleaning', label: 'Weekly Cleaning', icon: Star },
  { id: 'pool_maintenance', label: 'Pool & Garden Maintenance', icon: Trees },
  { id: 'internet', label: 'Internet', icon: Wifi },
  { id: 'banjar', label: 'Banjar Fees', icon: Landmark }
];

const STANDARD_EXCLUSIONS = [
  { id: 'utilities_excl', label: 'Utilities (Electricity, water)', icon: Zap },
  { id: 'laundry', label: 'Personal Laundry', icon: Bed },
  { id: 'daily_cleaning', label: 'Daily Cleaning', icon: Star },
  { id: 'repairs', label: 'Minor Repairs', icon: Wrench },
  { id: 'pest', label: 'Pest Control', icon: Bug },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee },
  { id: 'banjar_excl', label: 'Banjar Fees', icon: Landmark }
];



export default function EditProperty({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const property = mockProperties.find(p => p.id === resolvedParams.id);
  
  const [activeTab, setActiveTab] = useState('basic');
  const [idError, setIdError] = useState('');

  const [form, setForm] = useState({
    id: property?.id || '',
    title: property?.title || '',
    location: property?.location || '',
    price: property?.price || '',
    priceYearly: property?.priceYearly || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    guests: property?.guests || '',
    area: property?.area || '',
    floors: property?.floors || '',
    hasPool: property?.hasPool || false,
    hasRooftop: property?.hasRooftop || false,
    category: property?.category || 'Villa',
    imageUrl: property?.imageUrl || '',
    images: property?.images || [] as string[],
    status: property?.status || 'published',
    isRented: property?.isRented || false,
    availableFrom: property?.availableFrom || '',
    description: property?.description || '',
    amenities: (property?.amenities as PropertyFeature[]) || [] as PropertyFeature[],
    inclusions: (property?.inclusions as PropertyFeature[]) || [] as PropertyFeature[],
    exclusions: (property?.exclusions as PropertyFeature[]) || [] as PropertyFeature[],
    rules: (property?.rules as PropertyFeature[]) || [] as PropertyFeature[],
    contactType: property?.contactType || 'owner' as 'owner' | 'agent',
    ownerName: property?.ownerName || '',
    ownerWhatsApp: property?.ownerWhatsApp || '',
    agentName: property?.agentName || '',
    agentWhatsApp: property?.agentWhatsApp || '',
    listingType: (property?.listingType as 'rent' | 'sale') || 'rent',
    salePrice: property?.salePrice || '',
    youtubeUrl: property?.youtubeUrl || '',
    isCampaign: property?.isCampaign || false,
    campaignLabel: property?.campaignLabel || '',
    campaignTitle: property?.campaignTitle || '',
    campaignTheme: property?.campaignTheme || 'dark',
    nearbyPlaces: property?.nearbyPlaces || [] as NearbyPlace[],
  });
  
  const [saving, setSaving] = useState(false);
  const [newPlace, setNewPlace] = useState({ name: '', type: '', distance: '' });
  const [customTexts, setCustomTexts] = useState({
    amenities: '',
    inclusions: '',
    exclusions: '',
    rules: ''
  });

  const handleAddCustomFeature = (arrayName: 'amenities' | 'inclusions' | 'exclusions' | 'rules') => {
    const text = customTexts[arrayName].trim();
    if (!text) return;
    
    const newFeature = {
      id: `custom_${arrayName}_${Date.now()}`,
      label: text,
      pricing: 'both' as const
    };
    
    setForm(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], newFeature]
    }));
    
    setCustomTexts(prev => ({ ...prev, [arrayName]: '' }));
  };

  const handleAddNearbyPlace = () => {
    if (!newPlace.name || !newPlace.type || !newPlace.distance) return;
    
    setForm(prev => ({
      ...prev,
      nearbyPlaces: [...prev.nearbyPlaces, { ...newPlace, id: `place_${Date.now()}` }]
    }));
    setNewPlace({ name: '', type: '', distance: '' });
  };

  const handleRemoveNearbyPlace = (id: string) => {
    setForm(prev => ({
      ...prev,
      nearbyPlaces: prev.nearbyPlaces.filter(p => p.id !== id)
    }));
  };

  if (!property) return <div style={{padding: '2rem'}}>Property not found</div>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'id') {
      const isDuplicate = mockProperties.some(p => p.id === value && p.id !== resolvedParams.id);
      setIdError(isDuplicate ? 'This Property ID already exists.' : '');
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, imageUrl: url }));
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    
    const currentCount = form.images.length;
    const allowedNew = 10 - currentCount;
    const filesToAdd = files.slice(0, allowedNew);
    
    const newUrls = filesToAdd.map(f => URL.createObjectURL(f));
    
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...newUrls]
    }));
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleFeatureToggle = (
    checked: boolean, 
    featureDef: { id: string, label: string }, 
    arrayName: 'amenities' | 'inclusions' | 'exclusions' | 'rules'
  ) => {
    setForm(prev => {
      const currentArray = prev[arrayName] || [];
      if (checked) {
        return { 
          ...prev, 
          [arrayName]: [...currentArray, { id: featureDef.id, label: featureDef.label, pricing: 'both' as const }] 
        };
      } else {
        return { 
          ...prev, 
          [arrayName]: currentArray.filter((item: any) => item.id !== featureDef.id) 
        };
      }
    });
  };

  const handleFeaturePricing = (
    featureId: string, 
    pricing: 'monthly' | 'yearly' | 'both',
    arrayName: 'amenities' | 'inclusions' | 'exclusions' | 'rules'
  ) => {
    setForm(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item: any) => 
        item.id === featureId ? { ...item, pricing } : item
      )
    }));
  };

  const renderFeatureSection = (
    title: string, 
    subtitle: string, 
    features: any[], 
    arrayName: 'amenities' | 'inclusions' | 'exclusions' | 'rules'
  ) => {
    const standardIds = new Set(features.map(f => f.id));
    const customFeatures = form[arrayName].filter((f: any) => !standardIds.has(f.id));
    const allFeatures = [...features, ...customFeatures.map((f: any) => ({ ...f, icon: FileText }))];

    return (
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.pageSubtitle} style={{marginBottom: '1rem'}}>{subtitle}</p>
        <div className={styles.checkboxGrid}>
          {allFeatures.map(feat => {
            const selectedFeature = form[arrayName].find((f: any) => f.id === feat.id);
            const isSelected = !!selectedFeature;
            
            return (
              <div 
                key={feat.id} 
                className={`${styles.featureItemContainer} ${isSelected ? styles.featureItemContainerActive : ''}`}
              >
                <label className={styles.checkboxItem} style={{ padding: 0 }}>
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={(e) => handleFeatureToggle(e.target.checked, feat, arrayName)}
                  />
                  <feat.icon size={16} color="#8e8e93" />
                  <span className={styles.checkboxLabel}>{feat.label}</span>
                </label>
                
                {isSelected && (
                  <div className={styles.pricingPills} onClick={(e) => e.stopPropagation()}>
                    {(['monthly', 'yearly', 'both'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        className={`${styles.pricingPill} ${selectedFeature.pricing === p ? styles.pricingPillActive : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleFeaturePricing(feat.id, p, arrayName);
                        }}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            placeholder={`Add custom ${title.toLowerCase().replace(/s$/, '')}...`}
            value={customTexts[arrayName]}
            onChange={(e) => setCustomTexts(prev => ({ ...prev, [arrayName]: e.target.value }))}
            className={styles.input}
            style={{ flex: 1 }}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomFeature(arrayName))}
          />
          <button 
            type="button" 
            onClick={() => handleAddCustomFeature(arrayName)}
            style={{ padding: '0.7rem 1.2rem', borderRadius: '10px', background: '#f0f0f2', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} /> Add {title.replace(/s$/, '').split(' ').pop()}
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idError) return;
    setSaving(true);
    
    try {
      const result = await updateProperty(resolvedParams.id, {
        title: form.title,
        location_name: form.location,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        guests: Number(form.guests) || 0,
        area_sqm: Number(form.area) || 0,
        has_pool: form.hasPool,
        listing_type: form.listingType,
        monthly_price: Number(form.price) || 0,
        yearly_price: Number(form.priceYearly) || 0,
        sale_price: Number(form.salePrice) || 0,
        status: form.status,
        is_rented: form.isRented,
        available_from: form.availableFrom ? new Date(form.availableFrom).toISOString() : null,
        youtube_url: form.youtubeUrl,
        is_campaign: form.isCampaign,
        campaign_label: form.campaignLabel,
        campaign_title: form.campaignTitle,
        campaign_theme: form.campaignTheme,
        description: form.description
      });

      if (!result.success) {
        throw new Error(result.error);
      }
      
      console.log('Successfully updated property');
      router.push('/admin/properties');
    } catch (err: any) {
      console.error('Error updating property:', err);
      alert('Failed to update property: ' + (err.message || 'Check console for details.'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formHeader}>
        <Link href="/admin/properties" className={styles.backBtn}>
          <ArrowLeft size={18} />
          <span>Back to Properties</span>
        </Link>
        <h1 className={styles.pageTitle}>Edit Property</h1>
        <p className={styles.pageSubtitle}>
          Update the details for this property listing.
        </p>
      </div>

      <div className={styles.tabsContainer}>
        <button type="button" className={`${styles.tabBtn} ${activeTab === 'basic' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('basic')}>Basic Info</button>
        <button type="button" className={`${styles.tabBtn} ${activeTab === 'details' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('details')}>Details & Media</button>
        <button type="button" className={`${styles.tabBtn} ${activeTab === 'features' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('features')}>Features</button>
        <button type="button" className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.tabBtnActive : ''}`} onClick={() => setActiveTab('contact')}>Contact Info</button>
      </div>

      <form onSubmit={handleSubmit} className={styles.formCard}>
        {activeTab === 'basic' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Listing Status & ID</h2>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Property ID</label>
                  <input
                    type="text"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    placeholder="e.g. VILLA-001"
                    className={`${styles.input} ${idError ? styles.inputError : ''}`}
                    required
                  />
                  {idError && <span className={styles.errorText}><ShieldAlert size={14} /> {idError}</span>}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Visibility</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="draft">Draft (Hidden)</option>
                    <option value="published">Published (Live)</option>
                  </select>
                </div>
                
                <div className={styles.field}>
                  <div className={styles.toggleRow} style={{ paddingTop: '1.2rem' }}>
                    <label className={styles.label}>Mark as Recently Rented</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        name="isRented"
                        checked={form.isRented}
                        onChange={handleChange}
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Basic Information</h2>
              <div className={styles.fieldGrid}>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Property Title</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. The Glass House Villa"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Canggu, Bali"
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Listing Type</label>
                  <select
                    name="listingType"
                    value={form.listingType}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="rent">For Rent</option>
                    <option value="sale">For Sale</option>
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Price per Month (IDR)</label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="3500000"
                    className={styles.input}
                    min="0"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Price per Year (IDR)</label>
                  <input
                    type="number"
                    name="priceYearly"
                    value={form.priceYearly}
                    onChange={handleChange}
                    placeholder="35000000"
                    className={styles.input}
                    min="0"
                  />
                </div>

                {form.listingType === 'sale' && (
                  <div className={styles.fieldFull}>
                    <label className={styles.label}>Sale Price (IDR)</label>
                    <input
                      type="number"
                      name="salePrice"
                      value={form.salePrice}
                      onChange={handleChange}
                      placeholder="e.g. 5000000000"
                      className={styles.input}
                      min="0"
                    />
                  </div>
                )}

                {form.isRented && (
                  <div className={styles.field}>
                    <label className={styles.label}>Available From</label>
                    <input
                      type="text"
                      name="availableFrom"
                      value={form.availableFrom}
                      onChange={handleChange}
                      placeholder="e.g. Available Now or August 2026"
                      className={styles.input}
                    />
                  </div>
                )}

                <div className={styles.field} style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
                  <div className={styles.toggleRow}>
                    <label className={styles.label}>Feature as Campaign Card</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        name="isCampaign"
                        checked={form.isCampaign}
                        onChange={handleChange}
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
                {form.isCampaign && (
                  <div className={styles.fieldGrid} style={{ background: '#f9f9fb', padding: '1rem', borderRadius: '12px', marginTop: '0.5rem' }}>
                    <div className={styles.fieldFull}>
                      <label className={styles.label}>Campaign Badge</label>
                      <input
                        type="text"
                        name="campaignLabel"
                        value={form.campaignLabel}
                        onChange={handleChange}
                        placeholder="e.g. Trending"
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.fieldFull}>
                      <label className={styles.label}>Campaign Title (Use \n for breaks)</label>
                      <textarea
                        name="campaignTitle"
                        value={form.campaignTitle}
                        onChange={handleChange}
                        placeholder="e.g. Luxury Villas\n30% OFF"
                        className={styles.textarea}
                        style={{ minHeight: '60px' }}
                      />
                    </div>
                    <div className={styles.fieldFull}>
                      <label className={styles.label}>Theme</label>
                      <select
                        name="campaignTheme"
                        value={form.campaignTheme}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="dark">Dark Theme</option>
                        <option value="light">Light Theme</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className={styles.fieldFull}>
                  <label className={styles.label}>Description</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe the property..."
                    className={styles.input}
                    style={{ minHeight: '120px', resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'details' && (
          <>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Advanced Room Details</h2>
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <label className={styles.label}>Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    placeholder="3"
                    className={styles.input}
                    min="0"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Bathrooms</label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange}
                    placeholder="3"
                    className={styles.input}
                    min="0"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Max Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    placeholder="6"
                    className={styles.input}
                    min="1"
                    required
                  />
                </div>
                
                <div className={styles.field}>
                  <label className={styles.label}>Area (sqm)</label>
                  <input
                    type="number"
                    name="area"
                    value={form.area}
                    onChange={handleChange}
                    placeholder="240"
                    className={styles.input}
                    min="0"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Total Floors</label>
                  <input
                    type="number"
                    name="floors"
                    value={form.floors}
                    onChange={handleChange}
                    placeholder="2"
                    className={styles.input}
                    min="1"
                  />
                </div>

                <div className={styles.field}>
                  <div className={styles.toggleRow}>
                    <label className={styles.label}>Rooftop Access</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        name="hasRooftop"
                        checked={form.hasRooftop}
                        onChange={handleChange}
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>

                <div className={styles.field}>
                  <div className={styles.toggleRow}>
                    <label className={styles.label}>Private Pool</label>
                    <label className={styles.toggle}>
                      <input
                        type="checkbox"
                        name="hasPool"
                        checked={form.hasPool}
                        onChange={handleChange}
                      />
                      <span className={styles.toggleSlider} />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Property Images</h2>
              
              <div className={styles.fieldFull}>
                <label className={styles.label}>Cover Image</label>
                <label className={styles.uploadDropzone}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleCoverImageUpload} 
                  />
                  <Upload className={styles.uploadIcon} size={28} />
                  <span className={styles.uploadText}>Click to upload cover</span>
                  <span className={styles.uploadSubtext}>Recommended size: 1920x1080px</span>
                </label>
              </div>

              {form.imageUrl && (
                <div className={styles.imagePreview}>
                  <img src={form.imageUrl} alt="Cover Preview" className={styles.previewImg} />
                </div>
              )}

              <div className={styles.fieldFull} style={{ marginTop: '1.5rem' }}>
                <label className={styles.label}>YouTube Video URL (Optional)</label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={form.youtubeUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={styles.input}
                />
                <span className={styles.uploadSubtext} style={{ display: 'block', marginTop: '0.4rem' }}>
                  If provided, this video will replace the first image in the property gallery.
                </span>
              </div>

              <div className={styles.fieldFull} style={{ marginTop: '1.5rem' }}>
                <label className={styles.label}>Gallery Images (Max 10)</label>
                <label className={styles.uploadDropzone}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleGalleryImageUpload}
                    disabled={form.images.length >= 10}
                  />
                  <ImageIcon className={styles.uploadIcon} size={28} />
                  <span className={styles.uploadText}>
                    {form.images.length >= 10 ? 'Maximum 10 images reached' : 'Click to upload gallery images'}
                  </span>
                  <span className={styles.uploadSubtext}>Upload up to {10 - form.images.length} more</span>
                </label>
              </div>

              {form.images.length > 0 && (
                <div className={styles.imageThumbnailGrid}>
                  {form.images.map((img, idx) => (
                    <div key={idx} className={styles.thumbnailItem}>
                      <img src={img} alt={`Gallery ${idx}`} className={styles.thumbnailImg} />
                      <button 
                        type="button" 
                        className={styles.removeImageBtn} 
                        onClick={() => removeGalleryImage(idx)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'features' && (
          <>
            {renderFeatureSection('Amenities', 'Select all features available at this property.', STANDARD_AMENITIES, 'amenities')}
            {renderFeatureSection('Inclusions', 'Select services included in the rent.', STANDARD_INCLUSIONS, 'inclusions')}
            {renderFeatureSection('Exclusions', 'Select items explicitly NOT included in the rent.', STANDARD_EXCLUSIONS, 'exclusions')}
            
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Places Nearby</h2>
              <p className={styles.sectionSubtitle}>Add points of interest near this property.</p>
              
              <div className={styles.fieldGrid} style={{ background: '#f9f9fb', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid #e8e8ec' }}>
                <div className={styles.field}>
                  <label className={styles.label}>Place Name</label>
                  <input
                    type="text"
                    value={newPlace.name}
                    onChange={(e) => setNewPlace(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Finns Beach Club"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Category/Type</label>
                  <input
                    type="text"
                    value={newPlace.type}
                    onChange={(e) => setNewPlace(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g. Beach Club"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Distance</label>
                  <input
                    type="text"
                    value={newPlace.distance}
                    onChange={(e) => setNewPlace(prev => ({ ...prev, distance: e.target.value }))}
                    placeholder="e.g. 1.2 km"
                    className={styles.input}
                  />
                </div>
                <div className={styles.fieldFull}>
                  <button 
                    type="button" 
                    onClick={handleAddNearbyPlace}
                    disabled={!newPlace.name || !newPlace.type || !newPlace.distance}
                    style={{ padding: '0.8rem 1.2rem', borderRadius: '10px', background: '#111', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', opacity: (!newPlace.name || !newPlace.type || !newPlace.distance) ? 0.5 : 1 }}
                  >
                    <Plus size={16} /> Add Place
                  </button>
                </div>
              </div>

              {form.nearbyPlaces.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem', padding: '0 1.25rem 1.25rem' }}>
                  {form.nearbyPlaces.map(place => (
                    <div key={place.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#fff', border: '1px solid #e8e8ec', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#f0f0f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MapPin size={18} color="#666" />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111' }}>{place.name}</div>
                          <div style={{ fontSize: '0.85rem', color: '#888' }}>{place.type} • {place.distance}</div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveNearbyPlace(place.id)}
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.5rem', color: '#ff3b30' }}
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'contact' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            
            <div className={styles.contactTypeToggle}>
              <button
                type="button"
                className={`${styles.contactTypeBtn} ${form.contactType === 'owner' ? styles.contactTypeBtnActive : ''}`}
                onClick={() => setForm(prev => ({ ...prev, contactType: 'owner' }))}
              >
                Owner
              </button>
              <button
                type="button"
                className={`${styles.contactTypeBtn} ${form.contactType === 'agent' ? styles.contactTypeBtnActive : ''}`}
                onClick={() => setForm(prev => ({ ...prev, contactType: 'agent' }))}
              >
                Agent
              </button>
            </div>

            <div className={styles.fieldGrid}>
              {form.contactType === 'owner' ? (
                <>
                  <div className={styles.field}>
                    <label className={styles.label}>Owner Name</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="e.g. Wayan Putra"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Owner WhatsApp</label>
                    <input
                      type="text"
                      name="ownerWhatsApp"
                      value={form.ownerWhatsApp}
                      onChange={handleChange}
                      placeholder="e.g. +6281234567890"
                      className={styles.input}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.field}>
                    <label className={styles.label}>Agent Name</label>
                    <input
                      type="text"
                      name="agentName"
                      value={form.agentName}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Jenkins"
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Agent WhatsApp</label>
                    <input
                      type="text"
                      name="agentWhatsApp"
                      value={form.agentWhatsApp}
                      onChange={handleChange}
                      placeholder="e.g. +6289876543210"
                      className={styles.input}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        <div className={styles.formActions}>
          <Link href="/admin/properties" className={styles.cancelBtn}>
            Cancel
          </Link>
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={saving || !!idError}
          >
            {saving ? (
              <span className={styles.savingDots}>Saving...</span>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
