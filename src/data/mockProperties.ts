export interface PropertyFeature {
  id: string;
  label: string;
  pricing: 'monthly' | 'yearly' | 'both';
}

export interface NearbyPlace {
  id: string;
  name: string;
  type: string;
  distance: string;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  priceYearly?: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  floors?: number;
  hasPool: boolean;
  hasRooftop?: boolean;
  imageUrl: string;
  images?: string[];
  category: string;
  availableFrom?: string;
  rating?: number;
  status?: 'draft' | 'published';
  isRented?: boolean;
  description?: string;
  amenities?: PropertyFeature[];
  inclusions?: PropertyFeature[];
  exclusions?: PropertyFeature[];
  rules?: PropertyFeature[];
  contactType?: 'owner' | 'agent';
  ownerName?: string;
  ownerWhatsApp?: string;
  agentName?: string;
  agentWhatsApp?: string;
  commissionPercentage?: number;
  listingType?: 'rent' | 'sale';
  salePrice?: number;
  youtubeUrl?: string;
  // Added for Campaign feature
  isCampaign?: boolean;
  campaignLabel?: string;
  campaignTitle?: string;
  campaignTheme?: 'dark' | 'light';
  lat?: number;
  lng?: number;
  nearbyPlaces?: NearbyPlace[];
}

export const mockProperties: Property[] = [];
