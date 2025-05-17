'use client';

import Image from 'next/image';
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
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { AiOutlineComment } from 'react-icons/ai';
import styles from '../blogs.module.scss';

const BlogDetailsPage = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);

  const fetchPostById = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/posts/${id}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPost(data);

      if (session?.user?.id && Array.isArray(data.likes)) {
        setLiked(data.likes.includes(session.user.id));
        setLikesCount(data.likes.length);
      }

      if (data.category) {
        fetchRelatedPosts(data.category, data._id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedPosts = async (category, currentPostId) => {
    try {
      const res = await fetch(`/api/posts?category=${category}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch related posts');
      const data = await res.json();

      const filtered = data.filter(
        (p) => String(p._id) !== String(currentPostId)
      );
      setRelatedPosts(filtered);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/like`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to toggle like');

      const data = await res.json();
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPostById();
    }
  }, [id, status]);

  console.log(liked, likesCount, post);

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

                <button className="btn" onClick={handleToggleLike}>
                  {liked ? (
                    <PiHeartStraightFill color="red" />
                  ) : (
                    <PiHeartStraightLight />
                  )}
                  <span>{likesCount || 0}</span>
                </button>
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

{
  /* <div className={styles.liked}>
  <PiHeartStraightFill className={styles.icon} />
  <PiHeartStraightLight className={styles.icon} />
  <span>2</span>
  <AiOutlineComment className={styles.icon} />
  <span>4</span>
</div>; */
}
