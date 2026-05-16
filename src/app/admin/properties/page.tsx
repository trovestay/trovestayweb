'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Star,
  MoreVertical,
  Bed,
  Bath,
  User,
  Phone,
  ExternalLink,
  Key,
  Unlock,
  Save,
  ScanFace,
} from 'lucide-react';
import { mockProperties, Property } from '../../../data/mockProperties';
import styles from './properties.module.css';

// Individual Property Card Component
function PropertyCardItem({ property, onUpdate, onDelete }: { property: Property, onUpdate: (id: string, updates: any) => void, onDelete: (id: string) => void }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [status, setStatus] = useState<'locked' | 'prompting' | 'unlocked'>('locked');
  const [passcode, setPasscode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable fields
  const [editData, setEditData] = useState({
    ownerName: property.ownerName || '',
    ownerWhatsApp: property.ownerWhatsApp || '',
    agentName: property.agentName || '',
    agentWhatsApp: property.agentWhatsApp || '',
    commissionPercentage: property.commissionPercentage || 0
  });

  const handleUnlock = () => {
    if (passcode === '022320') {
      setStatus('unlocked');
      setPasscode('');
    } else {
      alert('Incorrect passcode');
    }
  };

  const handleFaceID = () => {
    setStatus('unlocked');
  };

  const handleSave = () => {
    onUpdate(property.id, editData);
    setIsEditing(false);
  };

  return (
    <div className={styles.propertyCard}>
      <div className={styles.imageWrap}>
        <img
          src={property.imageUrl}
          alt={property.title}
          className={styles.propertyCardImg}
        />
        <span className={styles.imageBadge}>TRV-{property.id}</span>
        <span className={styles.adminCategoryBadge}>{property.category}</span>
      </div>
      <div className={styles.propertyCardBody}>
        <div className={styles.propertyCardTop}>
          <div className={styles.propertyName}>{property.title}</div>
          <div className={styles.propertyId}>{property.location}</div>
        </div>
        
        <div className={styles.propertyCardMeta}>
          <span className={styles.categoryTag}>{property.category}</span>
          <span className={`${styles.badge} ${property.status === 'draft' ? styles.badgeDraft : styles.badgePublished}`}>
            {property.status || 'published'}
          </span>
          {property.isRented && (
            <span className={`${styles.badge} ${styles.badgeRented}`}>
              Rented
            </span>
          )}
          <span className={styles.priceCell} style={{ width: '100%' }}>Rp {property.price.toLocaleString('id-ID')}/mo</span>
        </div>
        
        <div className={styles.propertyCardDetails}>
          <span><Bed size={13} /> {property.bedrooms} Bed</span>
          <span><Bath size={13} /> {property.bathrooms} Bath</span>
        </div>

        {/* SECURE DATA BLOCK */}
        {status === 'prompting' && (
          <div className={styles.securePromptBox}>
            <div className={styles.secureHeader}>
              <Key size={14} /> <span>Security Verification</span>
            </div>
            <div className={styles.secureInputRow}>
              <input 
                type="password" 
                placeholder="Passcode" 
                className={styles.passcodeInput}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                autoFocus
              />
              <button className={styles.secureUnlockBtn} onClick={handleUnlock}>Unlock</button>
              <button className={styles.secureFaceIdBtn} onClick={handleFaceID} title="Use Face ID">
                <ScanFace size={16} />
              </button>
            </div>
          </div>
        )}

        {status === 'unlocked' && (
          <div className={styles.secureDataBox}>
            <div className={styles.secureDataHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Unlock size={14} color="#34C759" /> <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#34C759' }}>Unlocked</span>
              </div>
              {isEditing ? (
                <button className={styles.saveInlineBtn} onClick={handleSave}><Save size={14} /> Save</button>
              ) : (
                <button className={styles.editInlineBtn} onClick={() => setIsEditing(true)}><Edit3 size={14} /> Edit</button>
              )}
            </div>

            {isEditing ? (
              <div className={styles.editFormGrid}>
                <div className={styles.editField}>
                  <label>Owner Name</label>
                  <input type="text" value={editData.ownerName} onChange={e => setEditData({...editData, ownerName: e.target.value})} />
                </div>
                <div className={styles.editField}>
                  <label>Owner WA</label>
                  <input type="text" value={editData.ownerWhatsApp} onChange={e => setEditData({...editData, ownerWhatsApp: e.target.value})} />
                </div>
                <div className={styles.editField}>
                  <label>Agent Name</label>
                  <input type="text" value={editData.agentName} onChange={e => setEditData({...editData, agentName: e.target.value})} />
                </div>
                <div className={styles.editField}>
                  <label>Agent WA</label>
                  <input type="text" value={editData.agentWhatsApp} onChange={e => setEditData({...editData, agentWhatsApp: e.target.value})} />
                </div>
                <div className={styles.editField} style={{ gridColumn: '1 / -1' }}>
                  <label>Commission (%)</label>
                  <input type="number" value={editData.commissionPercentage} onChange={e => setEditData({...editData, commissionPercentage: Number(e.target.value)})} />
                </div>
              </div>
            ) : (
              <div className={styles.contactDetailsGrid}>
                {editData.ownerName && (
                  <div className={styles.contactDetailItem}>
                    <span className={styles.contactLabel}>Owner:</span>
                    <span className={styles.contactValue}>{editData.ownerName}</span>
                    {editData.ownerWhatsApp && <span className={styles.contactSubValue}>{editData.ownerWhatsApp}</span>}
                  </div>
                )}
                {editData.agentName && (
                  <div className={styles.contactDetailItem}>
                    <span className={styles.contactLabel}>Agent:</span>
                    <span className={styles.contactValue}>{editData.agentName}</span>
                    {editData.agentWhatsApp && <span className={styles.contactSubValue}>{editData.agentWhatsApp}</span>}
                  </div>
                )}
                <div className={styles.contactDetailItem}>
                  <span className={styles.contactLabel}>Commission:</span>
                  <span className={styles.contactValue}>{editData.commissionPercentage}%</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className={styles.cardActions}>
          <Link href={`/properties/${property.id}`} className={styles.actionIconBtn} title="View Live Site" target="_blank" rel="noopener noreferrer">
            <ExternalLink size={16} />
          </Link>
          <Link href={`/admin/properties/edit/${property.id}`} className={styles.actionIconBtn} title="Edit Property">
            <Edit3 size={16} />
          </Link>
          <button 
            className={`${styles.actionIconBtn} ${status !== 'locked' ? styles.actionIconBtnActive : ''}`}
            title={status !== 'locked' ? "Lock Info" : "Unlock Contact Info"}
            onClick={() => setStatus(status === 'locked' ? 'prompting' : 'locked')}
          >
            {status !== 'locked' ? <Unlock size={16} color="#34C759" /> : <Key size={16} />}
          </button>
          
          {deleteConfirm ? (
            <div className={styles.deleteConfirmRow}>
              <button
                className={styles.confirmDeleteBtn}
                onClick={() => onDelete(property.id)}
              >
                Yes
              </button>
              <button
                className={styles.cancelDeleteBtn}
                onClick={() => setDeleteConfirm(false)}
              >
                No
              </button>
            </div>
          ) : (
            <button
              className={styles.actionIconBtnDelete}
              title="Delete Property"
              onClick={() => setDeleteConfirm(true)}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminProperties() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) {
      setSearchQuery(s);
    }
  }, [searchParams]);

  const [properties, setProperties] = useState<Property[]>(mockProperties);

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    // In production, this would call the API
    console.log('Deleting property:', id);
    setProperties(properties.filter(p => p.id !== id));
  };

  const handleUpdateContact = (id: string, updates: any) => {
    setProperties(properties.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  return (
    <div className={styles.propertiesPage}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Properties</h1>
          <p className={styles.pageSubtitle}>
            Manage your {mockProperties.length} property listings
          </p>
        </div>
        <Link href="/admin/properties/new" className={styles.addBtn}>
          <Plus size={18} />
          <span>Add Property</span>
        </Link>
      </div>

      {/* Search + Filters Bar */}
      <div className={styles.toolbar}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by title, location, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.resultCount}>
          {filteredProperties.length} propert{filteredProperties.length !== 1 ? 'ies' : 'y'}
        </div>
      </div>

      {/* Property Grid */}
      {filteredProperties.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No properties found matching &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className={styles.propertyGrid}>
          {filteredProperties.map((property) => (
            <PropertyCardItem 
              key={property.id} 
              property={property} 
              onUpdate={handleUpdateContact} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
