'use client';

import { useState, useEffect } from 'react';
import Blogs from './ui/home/blogs/blogs';
import Hero from './ui/home/hero/hero';
import Newsletter from './ui/home/hero/newsletter';
import Loading from './ui/elements/loading';
import Empty from './ui/elements/empty';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts/', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  console.log(posts);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : posts?.length === 0 ? (
        <Empty />
      ) : (
        <>
          <Hero post={posts} />
          <Blogs post={posts} />
        </>
      )}

      <Newsletter />
    </section>
  );
}
