import Link from 'next/link';
import Image from 'next/image';
import authorImage from '../../../../../public/avatar3.jpg';
import { FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import styles from './card.module.scss';

const Author = ({ post }) => {
  return (
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
  );
};

export default Author;
