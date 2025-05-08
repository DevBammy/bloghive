import Image from 'next/image';
import RegisterImage from '../../../../public/blog20.jpg';
import { HiMiniArrowLongUp } from 'react-icons/hi2';
import styles from './register.module.scss';
import Link from 'next/link';

const Page = () => (
  <div className={styles.register}>
    <div className={styles.row}>
      <div className={styles.col}>
        <Image src={RegisterImage} alt="register page image" />
      </div>
      <div className={styles.col}>
        <h2>Create Account</h2>

        <div className={styles.socialAuth}>
          <button className="btn">Sign up with Google</button>
          <button className="btn btn_white">Sign up with Facebook</button>
        </div>

        <p>Or sign up using your email address</p>

        <form>
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" />
          </div>

          <button className="btn">Register</button>
        </form>
        <Link href="/auth/login" className={styles.login}>
          Already a user, sign in <HiMiniArrowLongUp />
        </Link>
      </div>
    </div>
  </div>
);

export default Page;
