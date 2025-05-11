import Link from 'next/link';
import styles from './hero.module.scss';

const Hero = ({ post }) => {
  return (
    <section className={styles.hero}>
      <Link href={`/blogs/${post[0]._id}`} className={styles.text}>
        <h3>Featured*</h3>
        <h1>{post[0].title}</h1>
        <p>{post.except}</p>
      </Link>

      <div className={styles.heroWrapper}>
        <picture>
          <img src={post[0].image} alt="" />
        </picture>
      </div>
    </section>
  );
};

export default Hero;
