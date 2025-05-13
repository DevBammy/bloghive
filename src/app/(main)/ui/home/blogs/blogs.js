'use client';

import Card from '../../blogs/card';
import styles from './blogs.module.scss';

const Blogs = ({ post }) => {
  return (
    <section className={styles.blogs}>
      <h2>Latest Blogs</h2>
      <div className={styles.latest__blogs}>
        {post.map((post) => (
          <Card post={post} key={post._id} />
        ))}
      </div>

      <button className="btn">Load More</button>
    </section>
  );
};

export default Blogs;
