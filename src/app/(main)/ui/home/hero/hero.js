import Link from 'next/link';
import styles from './hero.module.scss';
import Image from 'next/image';

const Hero = ({ post }) => {
  return (
    <section className={styles.hero}>
      <Link href={`/author/${post[0].author._id}`} className={styles.text}>
        <h3>Featured*</h3>
        <h1>{post[0].title}</h1>
        <p>{post.except}</p>
      </Link>

      <div className={styles.heroWrapper}>
        {/* <Image src={post[0].image} width={100} height={100} alt="post image" /> */}

        <picture>
          <img src={post[0].image} alt="" />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
