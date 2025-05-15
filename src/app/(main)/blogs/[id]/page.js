'use client';

import Image from 'next/image';
import blogImage from '../../../../../public/blog30.jpg';
import authorImage from '../../../../../public/avatar3.jpg';
import { FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import Link from 'next/link';
import Card from '../../ui/blogs/card';
import Newsletter from '../../ui/home/hero/newsletter';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loading from '../../ui/elements/loading';
import { formatDate } from '@/lib/formatDate';
import styles from '../blogs.module.scss';

const BlogDetailsPage = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostById = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${id}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPost(data);

      // fetch related posts after setting the post
      if (data.category) {
        fetchRelatedPosts(data.category);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category) => {
    try {
      const res = await fetch(`/api/posts?category=${category}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch related posts');
      const data = await res.json();

      // Exclude current post from related list
      const filtered = data.filter((p) => p._id !== id);
      setRelatedPosts(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className={styles.blogDetails}>
          <div className={styles.title}>
            <div className={styles.left}>
              <h1>{post.title}</h1>
              <p>{post.except}</p>
            </div>
            <div className={styles.right}>
              <div className={styles.metadata}>
                <span>DATE</span>
                <p>{formatDate(post.createdAt)}</p>
              </div>
              <div className={styles.metadata}>
                <span>CATEGORY</span>
                <p>{post.category}</p>
              </div>
              <div className={styles.metadata}>
                <span>READING TIME</span>
                <p>{post.time || '3 MINS'}</p>
              </div>
            </div>
          </div>

          <div className={styles.blogImage}>
            <Image
              src={post.image || ''}
              style={{ objectFit: 'cover' }}
              quality={100}
              alt="blog post image"
              width={1000}
              height={1000}
            />
          </div>

          <div className={styles.blogBody}>
            <div className={styles.row}>
              <div className={styles.col}>
                <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
              </div>

              <div className={styles.col}>
                <h3>AUTHOR</h3>

                <div className={styles.authorImage}>
                  <Image
                    src={post.author.avatar || authorImage}
                    alt="author images"
                  />
                </div>
                <h2>{post.author.name}</h2>
                <p>{post.author.desc || 'Best author 2025'}</p>

                <h3>SHARE</h3>

                <div className={styles.socialShare}>
                  <Link href="null">
                    <FaXTwitter />
                  </Link>
                  <Link href="null">
                    <FaFacebook />
                  </Link>
                  <Link href="null">
                    <FaLinkedin />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.relatedNewsTitle}>
            <h1>related news</h1>
            <Link href="/blogs" className="btn_white btn">
              SEE ALL
            </Link>
          </div>

          <div className={styles.relatedNews}>
            {relatedPosts.length > 0 ? (
              relatedPosts.map((relatedPost) => (
                <Card key={relatedPost._id} post={relatedPost} />
              ))
            ) : (
              <p>No related posts found.</p>
            )}
          </div>

          <Newsletter />
        </section>
      )}
    </>
  );
};

export default BlogDetailsPage;
