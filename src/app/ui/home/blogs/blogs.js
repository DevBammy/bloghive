import Card from '../../blogs/card';
import styles from './blogs.module.scss';

const Blogs = () => {
  return (
    <section className={styles.blogs}>
      <h2>Latest Blogs</h2>
      <div className={styles.latest__blogs}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <button className="btn">Load More</button>
    </section>
  );
};

export default Blogs;
