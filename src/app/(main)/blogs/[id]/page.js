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
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPostById = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/id/${postId}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPost(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, []);

  console.log(post);

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
                <p>20 MINS</p>
              </div>
            </div>
          </div>

          <div className={styles.blogImage}>
            <Image
              src={post.image}
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

                <Link href="null" className={styles.authorImage}>
                  <Image src={authorImage} alt="author images" />
                </Link>
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
            <Card />
            <Card />
            <Card />
          </div>

          <Newsletter />
        </section>
      )}
    </>
  );
};

export default BlogDetailsPage;
