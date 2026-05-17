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
    id: '1',
    title: 'The Glass House Villa',
    location: 'Canggu, Bali',
    price: 5250000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    area: 240,
    hasPool: true,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    category: 'Villa',
    status: 'published',
    isRented: false,
    ownerName: 'Wayan Putra',
    ownerWhatsApp: '+6281234567890',
    agentName: 'Sarah Jenkins',
    agentWhatsApp: '+6289876543210',
    listingType: 'rent',
    youtubeUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4',
    isCampaign: true,
    campaignLabel: 'Exclusive Deal',
    campaignTitle: 'Luxury Villas\n30% OFF',
    campaignTheme: 'dark',
    lat: -8.6478,
    lng: 115.1385,
    nearbyPlaces: [
      { id: '1', name: 'Finns Beach Club', type: 'Beach Club', distance: '1.2 km' },
      { id: '2', name: 'Baked.', type: 'Cafe', distance: '500 m' },
      { id: '3', name: 'Batu Bolong Beach', type: 'Beach', distance: '1.5 km' },
      { id: '4', name: 'Siloam Medika', type: 'Hospital', distance: '2.0 km' }
    ]
  },
  {
    id: '2',
    title: 'Tropical Modernist Haven',
    location: 'Ubud, Bali',
    price: 4200000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    area: 180,
    hasPool: true,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    category: 'Villa',
    status: 'published',
    isRented: false,
    ownerName: 'Made Sukana',
    ownerWhatsApp: '+628111222333',
    agentName: 'David Lee',
    agentWhatsApp: '+628999888777',
    isCampaign: true,
    campaignLabel: 'Trending',
    campaignTitle: 'Beachfront\nEstates',
    campaignTheme: 'light',
    lat: -8.5069,
    lng: 115.2625
  },
  {
    id: '3',
    title: 'Ocean View Penthouse',
    location: 'Seminyak, Bali',
    price: 6750000,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    area: 320,
    hasPool: false,
    imageUrl: 'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80',
    category: 'Apartment',
    status: 'published',
    isRented: false,
    lat: -8.6913,
    lng: 115.1682
  },
  {
    id: '4',
    title: 'Minimalist Jungle Retreat',
    location: 'Ubud, Bali',
    price: 2850000,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    area: 90,
    hasPool: true,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-c6a4d14effda?w=800&q=80',
    category: 'Jungle',
    status: 'published',
    isRented: false,
    lat: -8.4900,
    lng: 115.2600
  },
  {
    id: '5',
    title: 'Cliffside Estate',
    location: 'Uluwatu, Bali',
    price: 12750000,
    bedrooms: 5,
    bathrooms: 6,
    guests: 10,
    area: 550,
    hasPool: true,
    availableFrom: 'June 2026',
    imageUrl: 'https://images.unsplash.com/photo-1600607687930-cebc5a77722a?w=800&q=80',
    category: 'Beachfront',
    status: 'published',
    isRented: true,
    lat: -8.8291,
    lng: 115.0889
  },
  {
    id: '6',
    title: 'Serene Ricefield Villa',
    location: 'Canggu, Bali',
    price: 3300000,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    area: 150,
    hasPool: true,
    rating: 4.92,
    availableFrom: 'August 2026',
    imageUrl: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80',
    category: 'Villa',
    status: 'published',
    isRented: true,
    listingType: 'rent',
    lat: -8.6500,
    lng: 115.1400
  },
  {
    id: '7',
    title: 'Modern Off-Plan Villa',
    location: 'Pererenan, Bali',
    price: 0,
    salePrice: 4500000000,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    area: 300,
    hasPool: true,
    imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80',
    category: 'Villa',
    status: 'published',
    isRented: false,
    listingType: 'sale',
    youtubeUrl: 'https://www.youtube.com/watch?v=lxL0vXQkEik',
    lat: -8.6360,
    lng: 115.1278
  }
];
