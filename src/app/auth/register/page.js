import Image from 'next/image';
import styles from '../register/register.module.scss';
import RegisterImage from '../../../../public/blog20.jpg';

const Page = () => (
  <div className={styles.register}>
    <div className={styles.row}>
      <div className={styles.col}>
        <Image src={RegisterImage} />
      </div>
      <div className={styles.col}>
        <h2>Create Account</h2>

        <form>
          <div className="formControl">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="Your Name" />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Page;
