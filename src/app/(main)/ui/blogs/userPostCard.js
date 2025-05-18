'use client';

import Link from 'next/link';
import Image from 'next/image';
import blogImage from '../../../../../public/maleAvatar.jpg';
import { formatDate } from '@/lib/formatDate';
import styles from './card.module.scss';

const UserPostCard = ({ post, handleEdit }) => {
  const postId = post._id;

  return (
    <div className={`${styles.card} ${styles.userCard}`}>
      <Link href={`/blogs/${postId}`} className={styles.card__image}>
        <Image src={post.image} alt="Blog Post" width={1000} height={1000} />
      </Link>
      <div className={styles.card__content}>
        <h3>{post.title.substring(0, 50)}...</h3>
        <p>
          {post.except
            ? post.except.substring(0, 80)
            : post.title.toLowerCase()}
        </p>

        <div className={styles.cardBottom}>
          <div className={styles.card__info}>
            <Link href="null" className={styles.card__author}>
              <div className={styles.authorImage}>
                <Image
                  src={post.author.image || blogImage}
                  alt="Blog Post"
                  width={40}
                  height={40}
                />
                <div className={styles.authorBio}>
                  <p>{post.author.name}</p>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={() => handleEdit(postId)}
        className={`btn ${styles.btn}`}
      >
        Edit Post
      </button>
    </div>
  );
};

export default UserPostCard;
