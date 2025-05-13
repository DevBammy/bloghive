'use client';

import Link from 'next/link';
import Image from 'next/image';
import blogImage from '../../../../../public/maleAvatar.jpg';
import styles from './card.module.scss';
import { formatDate } from '@/lib/formatDate';

const Card = ({ post }) => {
  const postId = post._id;

  return (
    <div className={styles.card}>
      <Link href={`/blogs/${postId}`} className={styles.card__image}>
        <Image src={post.image} alt="Blog Post" width={1000} height={1000} />
      </Link>
      <div className={styles.card__content}>
        <h3>{post.title}</h3>
        <p>{post.except || post.title.toLowerCase()}</p>

        <div className={styles.cardBottom}>
          <div className={styles.card__info}>
            <Link href="null" className={styles.card__author}>
              <Image
                src={post.author.image || blogImage}
                alt="Blog Post"
                width={40}
                height={40}
              />
              <p>{post.author.name}</p>
            </Link>
          </div>
          <p>{formatDate(post.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
