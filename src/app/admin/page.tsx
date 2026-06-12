'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  TrendingUp,
  DollarSign,
  Activity,
  Plus,
  ExternalLink,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabaseClient';
import styles from './dashboard.module.css';

interface PropertyData {
  id: string;
  title: string;
  location: string;
  price: number;
  status: string;
  imageUrl: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching properties:', error);
      } else if (data) {
        const mapped: PropertyData[] = data.map((row: any) => ({
          id: row.slug || row.id,
          title: row.title,
          location: row.location_name || 'Bali, Indonesia',
          price: Number(row.monthly_price) || 0,
          status: row.status || 'Active',
          imageUrl: row.image_url || '/placeholder.jpg',
          created_at: row.created_at,
        }));
        setProperties(mapped);
      }
      setLoading(false);
    };
    
    fetchProperties();
  }, []);

  const totalProperties = properties.length;

  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Properties</h1>
          <p className={styles.pageSubtitle}>Manage your property listings.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/properties/new" className={styles.addBtn}>
            <Plus size={18} />
            <span>Add Property</span>
          </Link>
        </div>
      </div>


      {/* Recent Properties + Quick Actions */}
      <div className={styles.bottomGrid}>
        {/* Recent Properties */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Properties</h2>
            <Link href="/admin/properties" className={styles.viewAllLink}>
              View All <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Property</th>
                  <th className={styles.mobileHide}>Location</th>
                  <th>Price</th>
                  <th className={styles.mobileHide}>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#8e8e93' }}>
                      Loading properties...
                    </td>
                  </tr>
                ) : properties.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: '#8e8e93' }}>
                      No properties found. Add one to get started.
                    </td>
                  </tr>
                ) : (
                  properties.slice(0, 5).map((property) => (
                    <tr key={property.id}>
                      <td>
                        <div className={styles.propertyCell}>
                          <div className={styles.imageWrap}>
                            <img
                              src={property.imageUrl}
                              alt={property.title}
                              className={styles.tableThumbnail}
                            />
                            <span className={styles.imageBadge}>TRV</span>
                          </div>
                          <div>
                            <div className={styles.propertyName}>{property.title}</div>
                            <div className={styles.propertyId}>ID: {property.id.substring(0,8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className={`${styles.locationCell} ${styles.mobileHide}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#555' }}>
                          <MapPin size={12} color="#8e8e93" />
                          {property.location}
                        </div>
                      </td>
                      <td className={styles.priceCell}>Rp {property.price.toLocaleString('id-ID')}</td>
                      <td className={styles.mobileHide}>
                        <span className={styles.statusBadge}>{property.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActionsColumn}>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Quick Actions</h2>
            </div>
            <div className={styles.quickActions}>
              <Link href="/admin/properties/new" className={styles.quickAction}>
                <div className={styles.quickActionIcon} style={{ background: 'linear-gradient(135deg, #D4F721, #a8c41a)' }}>
                  <Plus size={20} color="#0c1015" />
                </div>
                <div>
                  <div className={styles.quickActionLabel}>Add Property</div>
                  <div className={styles.quickActionDesc}>Create a new listing</div>
                </div>
              </Link>
              <Link href="/" className={styles.quickAction} target="_blank">
                <div className={styles.quickActionIcon} style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
                  <ExternalLink size={20} color="#fff" />
                </div>
                <div>
                  <div className={styles.quickActionLabel}>View Live Site</div>
                  <div className={styles.quickActionDesc}>Open public website</div>
                </div>
              </Link>
              <button className={styles.quickAction}>
                <div className={styles.quickActionIcon} style={{ background: 'linear-gradient(135deg, #4facfe, #00f2fe)' }}>
                  <Download size={20} color="#fff" />
                </div>
                <div>
                  <div className={styles.quickActionLabel}>Export Data</div>
                  <div className={styles.quickActionDesc}>Download as CSV</div>
                </div>
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
