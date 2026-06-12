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

export const mockProperties: Property[] = [
  {
    id: 'ubud-villa-1',
    title: 'Serene Ubud Retreat with Rice Terrace Views',
    location: 'Ubud, Bali',
    price: 35000000,
    priceYearly: 350000000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    area: 250,
    hasPool: true,
    category: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
    ],
    status: 'published',
    isRented: false,
    listingType: 'rent',
    description: 'Experience tranquility in the heart of Ubud with this beautifully designed 3-bedroom villa overlooking lush rice terraces.'
  },
  {
    id: 'canggu-loft-2',
    title: 'Modern Industrial Loft near Echo Beach',
    location: 'Canggu, Bali',
    price: 28000000,
    priceYearly: 280000000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    area: 120,
    hasPool: true,
    category: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'
    ],
    status: 'published',
    isRented: false,
    listingType: 'rent',
    description: 'A stylish industrial loft located just a few minutes away from the famous Echo Beach, perfect for digital nomads.'
  },
  {
    id: 'uluwatu-cliff-3',
    title: 'Luxury Cliffside Mansion with Ocean Views',
    location: 'Uluwatu, Bali',
    price: 150000000,
    priceYearly: 1500000000,
    bedrooms: 5,
    bathrooms: 6,
    guests: 10,
    area: 800,
    hasPool: true,
    category: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1613490908653-b0fcba0a1871?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490908653-b0fcba0a1871?w=800&q=80'
    ],
    status: 'published',
    isRented: false,
    listingType: 'rent',
    description: 'Perched on the cliffs of Uluwatu, this ultra-luxury mansion offers unparalleled sunset views and world-class amenities.'
  },
  {
    id: 'seminyak-oasis-4',
    title: 'Tropical Oasis in Central Seminyak',
    location: 'Seminyak, Bali',
    price: 45000000,
    priceYearly: 450000000,
    bedrooms: 4,
    bathrooms: 4,
    guests: 8,
    area: 300,
    hasPool: true,
    category: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80'
    ],
    status: 'published',
    isRented: false,
    listingType: 'rent',
    description: 'Step into a private tropical oasis right in the center of Seminyak, within walking distance to top restaurants and boutiques.'
  },
  {
    id: 'nusa-dua-resort-5',
    title: 'Beachfront Family Villa with Private Access',
    location: 'Nusa Dua, Bali',
    price: 60000000,
    priceYearly: 600000000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    area: 400,
    hasPool: true,
    category: 'Villa',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80'
    ],
    status: 'published',
    isRented: false,
    listingType: 'rent',
    description: 'Enjoy direct access to the white sands of Nusa Dua beach from your private garden in this family-friendly luxury villa.'
  }
];
