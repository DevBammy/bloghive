'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { FaPenAlt, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import PersonalInfo from '../ui/profile/personalInfo';
import UserPosts from '../ui/profile/posts';
import PasswordManager from '../ui/profile/passwordManager';
import LogOut from '../ui/profile/logout';
import { useEffect, useState } from 'react';
import styles from './profile.module.scss';
import Link from 'next/link';

const ProfilePage = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('personal');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchMyPosts() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/posts/me`);
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error fetching posts:', err);
      }
    }

    fetchMyPosts();
  }, [status]);

  // const handleEdit = (postId) => {
  //   // Redirect to the edit page
  //   router.push(`/posts/edit/${postId}`);
  // };

  // const handleDelete = async (postId) => {
  //   const confirmDelete = confirm('Are you sure you want to delete this post?');
  //   if (confirmDelete) {
  //     const res = await fetch(`/api/posts/id/${postId}`, {
  //       method: 'DELETE',
  //     });

  //     if (res.ok) {
  //       alert('Post deleted!');
  //       // Refresh posts after deletion
  //       setPosts(posts.filter((post) => post._id !== postId));
  //     } else {
  //       alert('Failed to delete the post');
  //     }
  //   }
  // };

  // const handleProfileUpdate = async () => {
  //   const res = await fetch('/api/users/me', {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       name,
  //       image,
  //       email,
  //       password, // Only if user filled it
  //     }),
  //   });

  //   const updatedUser = await res.json();
  //   console.log(updatedUser);
  // };

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

        {view === 'posts' ? (
          <Link href="/create-post" className="btn">
            Add New Post
          </Link>
        ) : (
          ''
        )}
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
            className={view === 'posts' ? styles.active : ''}
          >
            <FaPenAlt />
            <span>My Posts</span>
          </button>

          {/* <button
            onClick={() => setView('password')}
            className={view === 'password' ? styles.active : ''}
          >
            <FaLock />
            <span>Password Manager</span>
          </button> */}
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
            <UserPosts post={posts} loading={loading} />
          ) : (
            <LogOut setView={setView} />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;

// view === 'password' ? (
//   <PasswordManager />
// ) :
