import Image from 'next/image';
import userImage from '../../../../../public/avatar3.jpg';
import styles from './profile.module.scss';

const PersonalInfo = ({ user }) => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profileImage}>
        <Image src={userImage} />
      </div>

      <form>
        <div className={styles.formControl}>
          <label htmlFor="name">Full Name</label>
          <input type="text" name="name" defaultValue={user?.name} />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" defaultValue={user?.email} />
        </div>
        <button className="btn">Update Profile</button>
      </form>
    </div>
  );
};

export default PersonalInfo;
