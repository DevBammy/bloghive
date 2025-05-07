import Link from 'next/link';
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <h2>Lets get started on something great</h2>
      <p>Join over 2,000+ writers and readers already on BlogHive</p>
      <div className={styles.ctas}>
        <Link href="/" className="btn_white">
          Talk to us
        </Link>
        <Link href="/login" className="btn_border">
          Get started
        </Link>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <h3>Categories</h3>
          <div className={styles.footerNav}>
            <Link href="/">All</Link>
            <Link href="/">Education</Link>
            <Link href="/">Sports</Link>
            <Link href="/">Politics</Link>
            <Link href="/">Finance</Link>
            <Link href="/">Tech</Link>
            <Link href="/">Religion</Link>
          </div>
        </div>
        <div className={styles.col}>
          <h3>Resources</h3>
          <div className={styles.footerNav}>
            <Link href="/">Blog</Link>
            <Link href="/">Newsletter</Link>
            <Link href="/">Events</Link>
            <Link href="/">Help Center</Link>
            <Link href="/">Tutorials</Link>
            <Link href="/">Support</Link>
          </div>
        </div>
        <div className={styles.col}>
          <h3>Social</h3>
          <div className={styles.footerNav}>
            <Link href="/">Twitter</Link>
            <Link href="/">LinkedIn</Link>
            <Link href="/">Facebook</Link>
            <Link href="/">GitHub</Link>
            <Link href="/">GitLab</Link>
            <Link href="/">Dribble</Link>
          </div>
        </div>
        <div className={styles.col}>
          <h3>Legal</h3>
          <div className={styles.footerNav}>
            <Link href="/">Terms</Link>
            <Link href="/">Privacy</Link>
            <Link href="/">Cookies</Link>
            <Link href="/">Licenses</Link>
            <Link href="/">Settings</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <h1 className={styles.logo}>
          Blog<span>Hive</span>
        </h1>

        <p>
          Designed and developed by
          <a href="https://devbammy.vercel.app/" target="_blank">
            Bamidele.dev
          </a>
        </p>
      </div>
    </section>
  );
};

export default Footer;
