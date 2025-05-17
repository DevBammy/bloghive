'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import authorImage from '../../../../../public/avatar3.jpg';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import { FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import { AiOutlineComment } from 'react-icons/ai';
import { IoCloseCircle } from 'react-icons/io5';
import Newsletter from '../../ui/home/hero/newsletter';
import Loading from '../../ui/elements/loading';
import { formatDate } from '@/lib/formatDate';
import Card from '../../ui/blogs/card';
import styles from '../blogs.module.scss';
import { toast } from 'react-toastify';

const BlogDetailsPage = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState([]);
  const [commenting, setCommenting] = useState(false);
  const [newComment, setNewComment] = useState('');

  // fetch all posts
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
      toast.error('Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  // fetch related posts
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
      toast.error('Failed to fetch');
    }
  };

  // like a post
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
      toast.success('Likes toggled');
    } catch (err) {
      toast.error('Failed to toggle like');
    }
  };

  // fetch all comment
  const fetchComment = async () => {
    try {
      setCommenting(true);
      const res = await fetch(`/api/posts/${id}/comment`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      setComment(data);
      setCommenting(false);
    } catch (error) {
      toast.error('Failed to fetch');
    } finally {
      setCommenting(false);
    }
  };

  // post a comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      setCommenting(true);
      const res = await fetch(`/api/posts/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ content: newComment }),
      });

      if (!res.ok) throw new Error('Failed to post comment');

      const data = await res.json();
      setCommenting(false);
      setComment((prev) => [...prev, data.comment]);
      setNewComment('');
      setShowComment(false);
      toast.success('Comment posted!');
    } catch (err) {
      toast.error('Failed to fetch');
      setCommenting(false);
    }
  };

  useEffect(() => {
    fetchPostById();
    fetchComment();
  }, [id, status]);

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

                <div className={styles.comment}>
                  <h3>All Comment</h3>

                  {commenting ? (
                    <p>Loading comments...</p>
                  ) : comment.length > 0 ? (
                    comment.map((com, i) => (
                      <div key={i} className={styles.commentItem}>
                        <div className={styles.commentAuthor}>
                          <Image
                            src={com.user?.image || authorImage}
                            alt={com.user?.name}
                            width={40}
                            height={40}
                          />
                          <strong>{com.user?.name || 'Anonymous'}</strong>
                        </div>
                        <p>{com.content}</p>
                      </div>
                    ))
                  ) : (
                    <p>This post has no comment(s) yet.</p>
                  )}

                  <div
                    className={
                      showComment
                        ? `${styles.commentBox} ${styles.show}`
                        : styles.commentBox
                    }
                  >
                    <IoCloseCircle
                      className={styles.icon}
                      onClick={() => setShowComment((prev) => !prev)}
                    />
                    <form
                      className={styles.commentContent}
                      onSubmit={handleSubmitComment}
                    >
                      <textarea
                        name="comment"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="type your comment here"
                      ></textarea>
                      <button className="btn" type="submit">
                        {commenting ? 'Commenting' : 'comment'}
                      </button>
                    </form>
                  </div>
                  <button
                    className="btn"
                    onClick={() => setShowComment((prev) => !prev)}
                  >
                    Add new comment
                  </button>
                </div>
              </div>

              <div className={styles.col}>
                <h3>AUTHOR</h3>

                <div className={styles.authorImage}>
                  <Image
                    src={post.author.image || authorImage}
                    alt="author images"
                    width={500}
                    height={500}
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
