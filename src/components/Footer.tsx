import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h2>TROVE STAY</h2>
          <p>Premium Bali Property Rentals</p>
        </div>
        <div className={styles.linksBlock}>
          <div className={styles.linkGroup}>
            <h3>Explore</h3>
            <Link href="/properties">Properties</Link>
            <Link href="/about">About Us</Link>
          </div>
          <div className={styles.linkGroup}>
            <h3>Owners</h3>
            <Link href="/list-property">List Your Property</Link>
            <Link href="/contact">Contact Support</Link>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} TROVE STAY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
