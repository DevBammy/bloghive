import Link from 'next/link';
import styles from './profile.module.scss';

const Title = ({ view }) => {
  return (
    <div className={styles.title}>
      <div>
        <h2>My Account</h2>
        <h4>
          Home /{' '}
          {view === 'personal'
            ? 'My Account'
            : view === 'posts'
            ? 'My Posts'
            : view === 'password'
            ? 'Password Manager'
            : 'Logout'}
        </h4>
      </div>

      {view === 'posts' ? (
        <Link href="/create-post" className="btn">
          Add New Post
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default Title;
