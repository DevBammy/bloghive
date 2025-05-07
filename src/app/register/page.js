import styles from './register.module.scss';

const Page = () => (
  <div className={styles.register}>
    <div className={styles.row}>
      <div className={styles.col}></div>
      <div className={styles.col}></div>
      <h2>Create Account</h2>

      <form>
        <div className="formControl">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Your Name" />
        </div>
      </form>
    </div>
  </div>
);

export default Page;
