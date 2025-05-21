'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FaPenAlt, FaRegUserCircle, FaSignOutAlt } from 'react-icons/fa';
import PersonalInfo from '../ui/profile/personalInfo';
import UserPosts from '../ui/profile/posts';
import LogOut from '../ui/profile/logout';
import styles from './profile.module.scss';
import { toast } from 'react-toastify';
import Title from '../ui/profile/title';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('personal');
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status !== 'authenticated') return;

    async function fetchMyPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts/me');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error('Failed to fetch');
      }
    }

    fetchMyPosts();
  }, [status]);

  const handleEdit = (postId) => {
    router.push(`/blogs/edit/${postId}`);
  };

  const handleDelete = async (postId) => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Post deleted!');
        // Refresh posts after deletion
        setPosts(posts.filter((post) => post._id !== postId));
      } else {
        toast.error('Failed to delete the post');
      }
    }
  };

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
      <Title view={view} />

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
            <UserPosts
              post={posts}
              loading={loading}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
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
