'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image';
import LoginImage from '../../../../public/blog21.jpg';
import { HiMiniArrowLongUp } from 'react-icons/hi2';
import { FaGoogle } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import styles from './login.module.scss';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!email || !password) {
      toast.error('Fill in all fields');
      setLoading(false);
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!res.error) {
      toast.success('Login Successful - Welcome to BlogHive');
      router.push('/');
    } else {
      setLoading(false);
      toast.error('Invalid Credentials');
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
            <button className="btn_google btn" onClick={() => signIn('google')}>
              <FaGoogle /> Sign up with Google
            </button>
            {/* <button
              className="btn btn_white"
              onClick={() => signIn('facebook')}
            >
              Sign up with Facebook
            </button> */}
          </div>

          <p>Or sign in using your email address</p>

          <form onSubmit={handleLogin}>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
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
