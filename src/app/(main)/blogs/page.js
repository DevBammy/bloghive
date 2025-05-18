'use client';

import { useEffect, useState } from 'react';
import Card from '../ui/blogs/card';
import Newsletter from '../ui/home/hero/newsletter';
import styles from './blogs.module.scss';
import Loading from '../ui/elements/loading';
import Empty from '../ui/elements/empty';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

const BlogPage = () => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const query = searchParams.get('');
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts?query=${query}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);

      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch', error);
      console.log(error);
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
