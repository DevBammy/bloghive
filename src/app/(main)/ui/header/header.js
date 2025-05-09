import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import styles from './header.module.scss';

const Header = () => {
  return (
    <section className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <h1>BlogHive</h1>
      </Link>
      <div className={styles.search}>
        <input type="text" placeholder="What are you looking for?" />

        <button>
          <CiSearch className={styles.icon} />
        </button>
      </div>

      <div className={styles.nav}>
        <nav className={styles.header__nav__left}>
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About Us</Link>
        </nav>
        <nav className={styles.header__nav__right}>
          <Link href="/auth/register">Sign Up</Link>
          <Link href="/auth/login" className="btn">
            Login
          </Link>
        </nav>
      </div>
    </section>
  );
};

export default Header;
