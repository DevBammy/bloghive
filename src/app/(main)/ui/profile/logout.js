import { signOut, useSession } from 'next-auth/react';
import styles from './profile.module.scss';

const LogOut = ({ setView }) => {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  return (
    <div className={styles.LogOut}>
      <div className={styles.logOutBox}>
        <p>Are you sure you want to log out?</p>
        <div className={styles.ctas}>
          <button className="btn" onClick={() => setView('personal')}>
            No
          </button>
          <button
            className="btn_white"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
