import Image from 'next/image';
import emptyImage from '../../../../../public/empty.png';
import styles from './elements.module.scss';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Empty = () => {
  const { data: session, status } = useSession();
  return (
    <section className={styles.empty}>
      <div className={styles.img}>
        <Image src={emptyImage} alt="loading image" />
      </div>
      <h2>No blog posts found!</h2>
      <Link href={session ? '/create-post' : '/auth/login'} className="btn">
        Add New Post
      </Link>
    </section>
  );
};

export default Empty;
