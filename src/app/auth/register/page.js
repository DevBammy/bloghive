'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import RegisterImage from '../../../../public/blog20.jpg';
import { HiMiniArrowLongUp } from 'react-icons/hi2';
import { toast } from 'react-toastify';
import styles from './register.module.scss';

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Something went wrong');
      }

      // Redirect to login page or homepage
      router.push('/auth/login');
      toast.success('registration successfull');
    } catch (err) {
      setLoading(false);
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Image src={RegisterImage} alt="register page image" />
        </div>
        <div className={styles.col}>
          <h2>Create Account</h2>

          <p>Or sign up using your email address</p>

          <form onSubmit={handleSubmit}>
            <div className={styles.formControl}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button className="btn">
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <Link href="/auth/login" className={styles.login}>
            Already a user, sign in <HiMiniArrowLongUp />
          </Link>
          <Link href="/" className={styles.goHome}>
            Return home
            <HiMiniArrowLongUp />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
