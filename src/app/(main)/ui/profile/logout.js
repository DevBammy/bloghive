import styles from './profile.module.scss';

const LogOut = ({ setView }) => {
  return (
    <div className={styles.LogOut}>
      <div className={styles.logOutBox}>
        <p>Are you sure you want to log out?</p>
        <div className={styles.ctas}>
          <button className="btn" onClick={() => setView('personal')}>
            No
          </button>
          <button className="btn_white">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
