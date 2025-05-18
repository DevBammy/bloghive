'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import Newsletter from '../../ui/home/hero/newsletter';
import Loading from '../../ui/elements/loading';
import { formatDate } from '@/lib/formatDate';
import { toast } from 'react-toastify';
import RelatedNews from '../../ui/blogs/relatedNews';
import LikeButton from '../../ui/blogs/likeButton';
import Comment from '../../ui/blogs/comment';
import Author from '../../ui/blogs/author';
import styles from '../blogs.module.scss';

const BlogDetailsPage = () => {
  const { data: session, status } = useSession();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const [liking, setLiking] = useState(false);
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
      setLiking(true);
      const res = await fetch(`/api/posts/${id}/like`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to toggle like');

      const data = await res.json();
      setLiking(false);
      setLiked(data.liked);
      setLikesCount(data.likesCount);
      toast.success('Likes toggled');
    } catch (err) {
      setLiking(false);
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

    if (!newComment) return toast.error('write a comment to post');

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

                <LikeButton
                  handleToggleLike={handleToggleLike}
                  liked={liked}
                  liking={liking}
                  likesCount={likesCount}
                />

                <Comment
                  commenting={commenting}
                  comment={comment}
                  showComment={showComment}
                  setShowComment={setShowComment}
                  handleSubmitComment={handleSubmitComment}
                  newComment={newComment}
                  setNewComment={setNewComment}
                />
              </div>

              <div className={styles.col}>
                <Author post={post} />
              </div>
            </div>
          </div>

          <RelatedNews relatedPosts={relatedPosts} />
          <Newsletter />
        </section>
      )}
    </>
  );
};

export default BlogDetailsPage;
