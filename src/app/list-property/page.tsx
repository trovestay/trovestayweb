import { UploadCloud } from 'lucide-react';
import styles from './Owner.module.css';

export default function Owner() {
  return (
    <div className={`container ${styles.ownerContainer}`}>
      <div className={styles.header}>
        <h1>List with TROVE STAY</h1>
        <p>Partner with Bali's most exclusive property management platform. We handle everything from bookings to premium concierge services.</p>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <div className={styles.sectionHeader}>
            <h2>1. About You</h2>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone / WhatsApp</label>
              <input type="tel" placeholder="+62 812..." required />
            </div>
          </div>

          <div className={styles.sectionHeader}>
            <h2>2. Property Details</h2>
          </div>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Property Name</label>
              <input type="text" placeholder="Villa Name" required />
            </div>
            <div className={styles.inputGroup}>
              <label>Location Area</label>
              <select defaultValue="">
                <option value="" disabled>Select Area</option>
                <option value="canggu">Canggu</option>
                <option value="ubud">Ubud</option>
                <option value="seminyak">Seminyak</option>
                <option value="uluwatu">Uluwatu</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Property Type</label>
              <select defaultValue="">
                <option value="" disabled>Select Type</option>
                <option value="villa">Villa</option>
                <option value="apartment">Apartment</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Number of Bedrooms</label>
              <input type="number" min="1" placeholder="e.g. 3" required />
            </div>
          </div>

          <div className={styles.sectionHeader}>
            <h2>3. Photos</h2>
          </div>
          <div className={styles.uploadArea}>
            <UploadCloud size={40} className={styles.uploadIcon} />
            <h3>Upload Property Photos</h3>
            <p>Drag and drop images here, or click to browse</p>
            <button type="button" className="btn btn-outline" style={{ marginTop: '1rem' }}>Choose Files</button>
          </div>

          <div className={styles.submitArea}>
            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>
              Submit Property
            </button>
            <p className={styles.disclaimer}>Our team will review your application and contact you within 24 hours.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
