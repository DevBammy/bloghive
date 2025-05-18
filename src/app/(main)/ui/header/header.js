'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LuSquareMenu } from 'react-icons/lu';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './header.module.scss';

const Header = () => {
  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Redirect with query string
    router.push(`/blogs/?query=${encodeURIComponent(searchInput.trim())}`);
    setSearchInput('');
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <h1>BlogHive</h1>
      </Link>
      <form onSubmit={handleSearch} className={styles.search}>
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button type="submit">
          <CiSearch className={styles.icon} />
        </button>
      </form>

      <div
        className={
          showNav ? `${styles.nav} ${styles.showMobileNav}` : styles.nav
        }
      >
        <nav className={styles.header__nav__left}>
          <Link href="/" onClick={() => setShowNav((prev) => !prev)}>
            Home
          </Link>
          <Link href="/blogs" onClick={() => setShowNav((prev) => !prev)}>
            Blogs
          </Link>
          <Link href="/about" onClick={() => setShowNav((prev) => !prev)}>
            About Us
          </Link>
        </nav>

        {session?.user ? (
          <Link
            href={session?.user ? '/user-profile' : '/auth/login'}
            onClick={() => setShowNav((prev) => !prev)}
          >
            Hi, {session.user.name}
          </Link>
        ) : (
          <nav className={styles.header__nav__right}>
            <Link
              href="/auth/register"
              onClick={() => setShowNav((prev) => !prev)}
            >
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className="btn"
              onClick={() => setShowNav((prev) => !prev)}
            >
              Login
            </Link>
          </nav>
        )}

        <div
          className={styles.closeBtn}
          onClick={() => setShowNav((prev) => !prev)}
        >
          <IoCloseCircleOutline className={styles.icon} />
        </div>
      </div>

      <div
        className={styles.toggleMobileMenu}
        onClick={() => setShowNav((prev) => !prev)}
      >
        <LuSquareMenu className={styles.icon} />
      </div>
    </header>
  );
};

export default Header;
