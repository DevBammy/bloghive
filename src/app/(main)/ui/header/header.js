'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LuSquareMenu } from 'react-icons/lu';
import { IoCloseCircleOutline } from 'react-icons/io5';
import styles from './header.module.scss';

const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();

  console.log(session);
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__logo}>
        <h1>BlogHive</h1>
      </Link>
      <div className={styles.search}>
        <input type="text" placeholder="What are you looking for?" />

        <button>
          <CiSearch className={styles.icon} />
        </button>
      </div>

      <div
        className={
          showNav ? `${styles.nav} ${styles.showMobileNav}` : styles.nav
        }
      >
        <nav className={styles.header__nav__left}>
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/about">About Us</Link>
        </nav>

        {session?.user ? (
          <span>Hi, {session.user.name}</span>
        ) : (
          <nav className={styles.header__nav__right}>
            <Link href="/auth/register">Sign Up</Link>
            <Link href="/auth/login" className="btn">
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
