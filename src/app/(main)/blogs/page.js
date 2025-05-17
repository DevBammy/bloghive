'use client';

import { useEffect, useState } from 'react';
import Card from '../ui/blogs/card';
import Newsletter from '../ui/home/hero/newsletter';
import styles from './blogs.module.scss';
import Loading from '../ui/elements/loading';
import Empty from '../ui/elements/empty';
import { toast } from 'react-toastify';

const BlogPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts/', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);
      const filtered = data.filter((p) => p._id !== id);
      setFilteredPost(filtered.slice(0, 2));

      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <section className={styles.blogPage}>
      <div className={styles.title}>
        <h1>All Blogs</h1>
        <p>
          Discover insights, inspiration, and expert advice on our engaging
          blog.
        </p>
      </div>

      {loading ? (
        <Loading />
      ) : posts?.length === 0 ? (
        <Empty />
      ) : (
        <>
          <div className={styles.featuredBlogs}>
            {filteredPost.map((post) => (
              <Card post={post} key={post._id} />
            ))}
          </div>

          <div className={styles.allBlogs}>
            {posts?.map((post) => (
              <Card post={post} key={post._id} />
            ))}
          </div>
        </>
      )}

      <Newsletter />
    </section>
  );
};

export default BlogPage;
