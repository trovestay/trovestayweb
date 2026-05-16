import Map from '../../components/Map';
import { mockProperties } from '../../data/mockProperties';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function LocationsPage() {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Absolute Back Button to overlay the map nicely */}
      <Link href="/" style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        zIndex: 10,
        backgroundColor: '#fff',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        textDecoration: 'none'
      }}>
        <ArrowLeft size={20} color="#111" />
      </Link>
      
      {/* Overlay Header */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        padding: '0.75rem 1.5rem',
        borderRadius: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111', margin: 0 }}>Explore Locations</h1>
        <span style={{ fontSize: '0.7rem', color: '#8E8E93', fontWeight: 500 }}>{mockProperties.length} Properties in Bali</span>
      </div>

      <div style={{ flex: 1, width: '100%', height: '100%' }}>
        <Map properties={mockProperties} zoom={11} height="100%" borderRadius="0px" />
      </div>
    </div>
  );
}
