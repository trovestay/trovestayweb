import styles from './About.module.css';

export default function About() {
  return (
    <div className={`container ${styles.aboutContainer}`}>
      <div className={styles.header}>
        <h1>Elevating Island Living.</h1>
        <p>TROVE STAY is the premier destination for luxury short and mid-term property rentals in Bali.</p>
      </div>

      <div className={styles.editorialGrid}>
        <div className={styles.imageBlock}>
          <img src="/placeholder.jpg" alt="Minimalist Bali Villa" />
        </div>
        <div className={styles.textBlock}>
          <h2>Our Mission</h2>
          <p>
            We curate spaces that inspire. Our mission is to bridge the gap between premium design and unparalleled tropical living.
            Whether you&apos;re a digital nomad seeking a month-long sanctuary in Canggu, or a family looking for a beachfront estate in Uluwatu,
            TROVE STAY delivers properties that meet the highest standards of luxury and comfort.
          </p>
          <p>
            Every home in our collection undergoes a rigorous vetting process, ensuring that the architecture, interior design,
            and amenities reflect the modern, minimal, and premium aesthetic our global clients expect.
          </p>
        </div>
      </div>

      <div className={styles.editorialGrid} style={{ direction: 'rtl' }}>
        <div className={styles.imageBlock}>
          <img src="/placeholder.jpg" alt="Beautiful details" />
        </div>
        <div className={styles.textBlock} style={{ direction: 'ltr' }}>
          <h2>The TROVE STAY Standard</h2>
          <p>
            It’s not just about a place to sleep; it’s about the experience. We believe in high-end glassmorphism seamlessly blended with
            natural stone and teakwood. We believe in soft shadows, abundant natural light, and the quiet luxury of a well-designed space.
          </p>
          <p>
            Welcome to the new standard of Bali property rentals.
          </p>
        </div>
      </div>
    </div>
  );
}
