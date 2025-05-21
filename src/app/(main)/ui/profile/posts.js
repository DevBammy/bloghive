import Card from '../blogs/card';
import styles from './profile.module.scss';
import Empty from '../elements/empty';
import Loading from '../elements/loading';
import UserPostCard from '../blogs/userPostCard';

const UserPosts = ({ post, loading, handleEdit, handleDelete }) => {
  return (
    <div className={styles.userPosts}>
      {loading ? (
        <Loading />
      ) : post.length === 0 ? (
        <Empty />
      ) : (
        post?.map((post) => (
          <UserPostCard
            post={post}
            key={post._id}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default UserPosts;
