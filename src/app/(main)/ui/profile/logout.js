import { signOut, useSession } from 'next-auth/react';
import styles from './profile.module.scss';
import { toast } from 'react-toastify';

const LogOut = ({ setView }) => {
  const { status } = useSession();

  if (status !== 'authenticated') return null;

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
    toast.success('signed out successfully');
  };

  return (
    <div className={styles.LogOut}>
      <div className={styles.logOutBox}>
        <p>Are you sure you want to log out?</p>
        <div className={styles.ctas}>
          <button className="btn" onClick={() => setView('personal')}>
            No
          </button>
          <button className="btn_white" onClick={handleSignOut}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
