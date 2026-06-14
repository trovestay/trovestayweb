import { MapPin, Mail, MessageCircle } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <div className={`container ${styles.contactContainer}`}>
      <div className={styles.header}>
        <h1>Get in Touch.</h1>
        <p>We&apos;re here to help you find your perfect stay or manage your premium property.</p>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.infoCol}>
          <div className={styles.infoCard}>
             <h2>Contact Information</h2>
             
             <div className={styles.infoItem}>
                <MapPin className={styles.icon} />
                <div>
                  <strong>Office</strong>
                  <p>Jl. Pantai Berawa No. 99<br/>Canggu, Bali, Indonesia 80361</p>
                </div>
             </div>
             
             <div className={styles.infoItem}>
                <Mail className={styles.icon} />
                <div>
                  <strong>Email</strong>
                  <p>hello@utopiaestate.com</p>
                </div>
             </div>

             <div className={styles.divider}></div>
             
             <a href="#" className={`btn btn-secondary ${styles.whatsappBtn}`}>
               <MessageCircle size={20} /> Connect on WhatsApp
             </a>
          </div>
        </div>

        <div className={styles.formCol}>
          <form className={styles.form}>
            <h2>Send an Inquiry</h2>
            
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>

            <div className={styles.inputGroup}>
              <label>Message</label>
              <textarea placeholder="How can we help you?" rows={5} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.05rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
