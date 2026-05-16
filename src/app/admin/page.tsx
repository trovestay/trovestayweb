'use client';

import {
  Building2,
  TrendingUp,
  DollarSign,
  Star,
  Plus,
  ExternalLink,
  Download,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';
import { mockProperties } from '../../data/mockProperties';
import styles from './dashboard.module.css';

const stats = [
  {
    label: 'Total Properties',
    value: mockProperties.length.toString(),
    change: '+2 this month',
    trend: 'up',
    icon: Building2,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    label: 'Active Listings',
    value: mockProperties.length.toString(),
    change: '100% active',
    trend: 'up',
    icon: TrendingUp,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },


];

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back, Alex. Here&apos;s your property overview.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/properties/new" className={styles.addBtn}>
            <Plus size={18} />
            <span>Add Property</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={styles.statCard}>
              <div className={styles.statTop}>
                <div
                  className={styles.statIconWrap}
                  style={{ background: stat.gradient }}
                >
                  <Icon size={20} color="#fff" />
                </div>
                <div className={`${styles.statTrend} ${stat.trend === 'up' ? styles.trendUp : styles.trendDown}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          );
        })}
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
                {mockProperties.slice(0, 5).map((property) => (
                  <tr key={property.id}>
                    <td>
                      <div className={styles.propertyCell}>
                        <div className={styles.imageWrap}>
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className={styles.tableThumbnail}
                          />
                          <span className={styles.imageBadge}>TRV-{property.id}</span>
                        </div>
                        <div>
                          <div className={styles.propertyName}>{property.title}</div>
                          <div className={styles.propertyId}>TRV-{property.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className={`${styles.locationCell} ${styles.mobileHide}`}>{property.location}</td>
                    <td className={styles.priceCell}>Rp {property.price.toLocaleString('id-ID')}/mo</td>

                    <td className={styles.mobileHide}>
                      <span className={styles.statusBadge}>Active</span>
                    </td>
                  </tr>
                ))}
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

          {/* Recent Inquiries */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Recent Inquiries</h2>
              <Link href="/admin/inquiries" className={styles.viewAllLink}>
                View All <ArrowUpRight size={14} />
              </Link>
            </div>
            <div className={styles.inquiryList}>
              {[
                { name: 'Sarah Jenkins', time: '2 hours ago', prop: 'The Glass House Villa' },
                { name: 'Michael Chen', time: '5 hours ago', prop: 'Ocean View Penthouse' },
                { name: 'Emma Watson', time: '1 day ago', prop: 'Tropical Modernist Haven' },
              ].map((inq, i) => (
                <div key={i} className={styles.inquiryItem}>
                  <div className={styles.inquiryAvatar}>{inq.name.charAt(0)}</div>
                  <div className={styles.inquiryInfo}>
                    <div className={styles.inquiryName}>{inq.name}</div>
                    <div className={styles.inquiryMeta}>{inq.prop}</div>
                  </div>
                  <div className={styles.inquiryTime}>{inq.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
