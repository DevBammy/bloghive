import Newsletter from '../ui/home/hero/newsletter';
import styles from './about.module.scss';

const BlogPage = () => {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.title}>
        <h1>About BlogHive</h1>
      </div>

      <Newsletter />
    </section>
  );
};

export default BlogPage;
