'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import LoginImage from '../../../../public/blog21.jpg';
import { HiMiniArrowLongUp } from 'react-icons/hi2';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './login.module.scss';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Image src={LoginImage} alt="register page image" />
        </div>
        <div className={styles.col}>
          <h2>Sign In</h2>

          <div className={styles.socialAuth}>
            <button className="btn" onClick={() => signIn('google')}>
              Sign up with Google
            </button>
            <button
              className="btn btn_white"
              onClick={() => signIn('facebook')}
            >
              Sign up with Facebook
            </button>
          </div>

          <p>Or sign in using your email address</p>

          <form onSubmit={handleLogin}>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" />
            </div>

            <button type="submit" className="btn">
              Sign in
            </button>
          </form>
          <Link href="/auth/register" className={styles.login}>
            Not yet a user, register
            <HiMiniArrowLongUp />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
