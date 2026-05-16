'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Property } from '../data/mockProperties';
import Link from 'next/link';
import { useAppContext } from '../context/AppContext';

// Fix for default marker icons in Leaflet with Webpack/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Premium Custom Marker - Text Only Label
const createCustomIcon = (text: string) => {
  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `
      <div class="text-only-marker">
        <span class="text-only-label">${text}</span>
      </div>
    `,
    iconSize: [120, 36],
    iconAnchor: [60, 18],
  });
};

// Single-property location pin (minimal dot since there's no location text for a single property view)
const createLocationIcon = () => {
  return L.divIcon({
    className: 'custom-marker-wrapper',
    html: `
      <div class="text-only-marker single">
        <div class="minimal-dot"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

interface MapProps {
  properties: Property[];
  center?: [number, number];
  zoom?: number;
  height?: string;
  borderRadius?: string;
  interactive?: boolean;
}

function MapUpdater({ center, zoom, selectedLocation }: { center: [number, number], zoom: number, selectedLocation?: {lat: number, lng: number} | null }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      // Offset slightly down so the pin isn't hidden by the cards
      const offsetLat = selectedLocation.lat - 0.015;
      map.flyTo([offsetLat, selectedLocation.lng], 14, { duration: 0.6 });
    } else {
      map.setView(center, zoom);
    }
  }, [center, zoom, map, selectedLocation]);
  return null;
}

export default function DynamicMap({ properties, center, zoom = 12, height = '400px', borderRadius = '24px', interactive = true }: MapProps) {
  const { formatLargePrice, formatPrice, t } = useAppContext();
  
  // State for the custom map overlay
  const [selectedLocation, setSelectedLocation] = useState<{name: string, properties: Property[], lat: number, lng: number} | null>(null);
  
  const defaultCenter = center || (properties.length > 0 && properties[0].lat && properties[0].lng 
    ? [properties[0].lat, properties[0].lng] 
    : [-8.409518, 115.188919]); // Bali default

  const isSingleProperty = properties.length === 1 && !interactive;

  const groupedProperties = properties.reduce((acc, curr) => {
    const locationKey = curr.location.split(',')[0].trim();
    if (!acc[locationKey]) {
      acc[locationKey] = { name: locationKey, properties: [], lat: 0, lng: 0 };
    }
    if (curr.lat && curr.lng) {
      acc[locationKey].properties.push(curr);
      acc[locationKey].lat += curr.lat;
      acc[locationKey].lng += curr.lng;
    }
    return acc;
  }, {} as Record<string, { name: string, properties: Property[], lat: number, lng: number }>);

  const locations = Object.values(groupedProperties).map(group => ({
    name: group.name,
    properties: group.properties,
    lat: group.properties.length > 0 ? group.lat / group.properties.length : 0,
    lng: group.properties.length > 0 ? group.lng / group.properties.length : 0,
  })).filter(loc => loc.lat !== 0);

  return (
    <div style={{ height, width: '100%', borderRadius, overflow: 'hidden', zIndex: 1, position: 'relative' }}>
      <MapContainer 
        center={defaultCenter as [number, number]} 
        zoom={zoom} 
        scrollWheelZoom={interactive}
        dragging={interactive}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Premium Light Tiles (CartoDB Positron) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapUpdater center={defaultCenter as [number, number]} zoom={zoom} selectedLocation={selectedLocation} />
        
        {interactive ? locations.map(loc => (
            <Marker 
              key={loc.name} 
              position={[loc.lat, loc.lng]} 
              icon={createCustomIcon(loc.name)}
              eventHandlers={{ click: () => setSelectedLocation(loc) }}
            >
            </Marker>
        )) : properties.map(property => {
          if (!property.lat || !property.lng) return null;
          return (
            <Marker 
              key={property.id} 
              position={[property.lat, property.lng]} 
              icon={createLocationIcon()}
            />
          );
        })}
      </MapContainer>
      
      {/* Modern Floating Overlay Cards - Cinematic Redesign */}
      {selectedLocation && (
        <div className="map-overlay-container">
          <div className="map-overlay-header">
            <div className="map-overlay-pill">
              <div className="map-overlay-pill-info">
                <h3 className="map-overlay-title">{selectedLocation.name}</h3>
                <span className="map-overlay-count">{selectedLocation.properties.length} Available</span>
              </div>
              <div className="map-overlay-divider"></div>
              <button className="map-overlay-close" onClick={() => setSelectedLocation(null)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
          
          <div className="map-overlay-scroll">
            {selectedLocation.properties.map(property => (
              <Link href={`/properties/${property.id}`} key={property.id} className="map-property-card cinematic-card">
                <img src={property.imageUrl} alt={property.title} className="cinematic-bg" />
                <div className="cinematic-gradient"></div>
                
                <div className="cinematic-content">
                  <div className="cinematic-top">
                    <div className="cinematic-price">
                      {formatPrice(property.price || property.salePrice || 0)} <span>{property.listingType === 'sale' ? '' : t('monthly')}</span>
                    </div>
                  </div>
                  <div className="cinematic-bottom">
                    <h4 className="cinematic-title">{property.title}</h4>
                    <p className="cinematic-location">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {property.location}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      <style jsx global>{`
        .leaflet-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        /* Hide native Leaflet elements */
        .leaflet-control-container .leaflet-routing-container,
        .leaflet-control-attribution {
          display: none !important;
        }

        /* --- Modern Map Overlay System --- */
        .map-overlay-container {
          position: absolute;
          bottom: 135px; /* Ensures clearance above the bottom navbar with elegant spacing */
          left: 0;
          width: 100%;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          pointer-events: none; /* Let map be clickable behind */
          animation: slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .map-overlay-header {
          display: flex;
          justify-content: center; /* Center the new pill */
          align-items: center;
          padding: 0 1.25rem;
          pointer-events: auto;
        }

        .map-overlay-pill {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 0.35rem 0.5rem 0.35rem 1.25rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          border: 1px solid rgba(255,255,255,0.8);
          gap: 0.75rem;
        }

        .map-overlay-pill-info {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
        }

        .map-overlay-title {
          font-size: 1rem;
          font-weight: 800;
          color: #111;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .map-overlay-count {
          font-size: 0.7rem;
          color: #8E8E93;
          font-weight: 600;
        }

        .map-overlay-divider {
          width: 1px;
          height: 20px;
          background-color: #e5e5ea;
        }

        .map-overlay-close {
          width: 32px;
          height: 32px;
          background: #f2f2f7;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          color: #8E8E93;
          cursor: pointer;
          transition: all 0.15s;
        }
        .map-overlay-close:hover {
          background: #e5e5ea;
          color: #111;
        }
        .map-overlay-close:active {
          transform: scale(0.9);
        }

        /* Scrollable Cards Container */
        .map-overlay-scroll {
          display: flex;
          gap: 1rem;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding: 0.25rem 1.5rem 1rem 1.5rem;
          pointer-events: auto;
        }

        .map-overlay-scroll::-webkit-scrollbar {
          display: none;
        }

        /* Cinematic Property Card */
        .cinematic-card {
          position: relative;
          min-width: 260px;
          width: 260px;
          height: 175px;
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          scroll-snap-align: center;
          box-shadow: 0 16px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08);
          text-decoration: none;
          transform: translateZ(0); /* Hardware accel */
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
        }

        .cinematic-card:active {
          transform: scale(0.95);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }

        .cinematic-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .cinematic-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.4) 45%, rgba(0,0,0,0.9) 100%);
          z-index: 2;
        }

        .cinematic-content {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          padding: 1rem;
        }

        .cinematic-top {
          display: flex;
          justify-content: flex-end;
        }

        .cinematic-price {
          background: rgba(17, 17, 17, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #fff;
          padding: 0.35rem 0.75rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.85rem;
          border: 1px solid rgba(255,255,255,0.12);
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .cinematic-price span {
          font-size: 0.65rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .cinematic-bottom {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .cinematic-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #fff;
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          letter-spacing: -0.01em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .cinematic-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.85);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 600;
          text-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }

        /* ---- Text-Only Location Titles (Ultra-Minimal) ---- */
        .custom-marker-wrapper {
          background: transparent !important;
          border: none !important;
        }

        .text-only-marker {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .text-only-label {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #111;
          padding: 8px 18px;
          border-radius: 30px;
          font-weight: 800;
          font-size: 0.85rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.1);
          border: 1px solid rgba(0,0,0,0.06);
          white-space: nowrap;
          transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
          letter-spacing: -0.01em;
          cursor: pointer;
        }

        .custom-marker-wrapper:hover .text-only-label {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          background: #ffffff;
          color: #000;
        }

        .minimal-dot {
          width: 14px;
          height: 14px;
          background: var(--color-accent, #D4F721);
          border-radius: 50%;
          box-shadow: 0 0 0 3px #fff, 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 0.3s cubic-bezier(0.2, 0, 0, 1);
        }

        .custom-marker-wrapper:hover .minimal-dot {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
}
