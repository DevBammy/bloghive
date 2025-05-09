import Card from '../ui/blogs/card';
import Newsletter from '../ui/home/hero/newsletter';
import styles from './blogs.module.scss';

const BlogPage = () => {
  return (
    <section className={styles.blogPage}>
      <div className={styles.title}>
        <h1>All Blogs</h1>
        <p>
          Discover insights, inspiration, and expert advice on our engaging
          blog.
        </p>
      </div>

      <div className={styles.featuredBlogs}>
        <Card />
        <Card />
      </div>

      <div className={styles.allBlogs}>
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <Newsletter />
    </section>
  );
};

export default BlogPage;
