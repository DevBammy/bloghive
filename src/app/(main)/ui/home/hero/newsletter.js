import styles from './newsletter.module.scss';

const Newsletter = () => (
  <div className={styles.newsletter}>
    <div className={styles.row}>
      <div className={styles.col}>
        <h3>NEWSLETTER</h3>
        <h1>Get the latest news into your inbox</h1>
      </div>
      <div className={styles.col}>
        <p>
          Stay informed and up-to-date with the latest news delivered straight
          to your inbox for a seamless and convenient experience.
        </p>
        <form>
          <input type="text" placeholder="name@email.com" />
          <button type="button">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
);

export default Newsletter;
