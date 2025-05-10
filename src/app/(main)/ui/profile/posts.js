import Card from '../blogs/card';
import styles from './profile.module.scss';

const UserPosts = () => (
  <div className={styles.userPosts}>
    <Card />
    <Card />
    <Card />
  </div>
);

export default UserPosts;
