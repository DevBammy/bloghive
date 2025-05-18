import Link from 'next/link';
import Card from './card';
import styles from './card.module.scss';

const RelatedNews = ({ relatedPosts }) => {
  return (
    <>
      <div className={styles.relatedNewsTitle}>
        <h1>related news</h1>
        <Link href="/blogs" className="btn_white btn">
          SEE ALL
        </Link>
      </div>

      <div className={styles.relatedNews}>
        {relatedPosts.length > 0 ? (
          relatedPosts.map((relatedPost) => (
            <Card key={relatedPost._id} post={relatedPost} />
          ))
        ) : (
          <p>No related posts found.</p>
        )}
      </div>
    </>
  );
};

export default RelatedNews;
