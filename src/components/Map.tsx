'use client';

import dynamic from 'next/dynamic';

const Map = dynamic(() => import('./DynamicMap'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: '100%', minHeight: '400px', backgroundColor: '#f2f2f7', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8E8E93', fontWeight: 600 }}>Loading map...</div>
});

export default Map;
