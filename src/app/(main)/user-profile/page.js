'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { FaPenAlt, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import PersonalInfo from '../ui/profile/personalInfo';
import UserPosts from '../ui/profile/posts';
import PasswordManager from '../ui/profile/passwordManager';
import LogOut from '../ui/profile/logout';
import { useState } from 'react';
import styles from './profile.module.scss';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [view, setView] = useState('personal');

  return (
    <section className={styles.profile}>
      <div className={styles.title}>
        <div>
          <h2>My Account</h2>
          <h4>
            Home /{' '}
            {view === 'personal'
              ? 'My Account'
              : view === 'posts'
              ? 'My Posts'
              : view === 'password'
              ? 'Password Manager'
              : 'Logout'}
          </h4>
        </div>

        {view === 'posts' ? <button className="btn">Add New Post</button> : ''}
      </div>

      <div className={styles.profileRow}>
        <div className={styles.profileControl}>
          <button
            onClick={() => setView('personal')}
            className={view === 'personal' ? styles.active : ''}
          >
            <FaRegUserCircle /> <span>Personal Information</span>
          </button>

          <button
            onClick={() => setView('posts')}
            className={view === 'post' ? styles.active : ''}
          >
            <FaPenAlt />
            <span>My Posts</span>
          </button>

          <button
            onClick={() => setView('password')}
            className={view === 'password' ? styles.active : ''}
          >
            <FaLock />
            <span>Password Manager</span>
          </button>
          <button
            onClick={() => setView('logout')}
            className={view === 'logout' ? styles.active : ''}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>

        <div className={styles.profileDisplay}>
          {view === 'personal' ? (
            <PersonalInfo user={session?.user} />
          ) : view === 'posts' ? (
            <UserPosts />
          ) : view === 'password' ? (
            <PasswordManager />
          ) : (
            <LogOut setView={setView} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
