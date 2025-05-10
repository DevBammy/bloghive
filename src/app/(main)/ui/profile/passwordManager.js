import styles from './profile.module.scss';

const PasswordManager = () => (
  <div className={styles.PasswordManager}>
    <h2>Update your password</h2>
    <form>
      <label htmlFor="oldPassword">Old Password</label>
      <input type="password" />
      <label htmlFor="newPassword">New Password</label>
      <input type="password" />
      <button className="btn">Update Password</button>
    </form>
  </div>
);

export default PasswordManager;
