import Card from '../blogs/card';
import styles from './profile.module.scss';
import Empty from '../elements/empty';
import Loading from '../elements/loading';

const UserPosts = ({ post, loading }) => {
  return (
    <div className={styles.userPosts}>
      {loading ? (
        <Loading />
      ) : post.length === 0 ? (
        <Empty />
      ) : (
        post?.map((post) => <Card post={post} key={post._id} />)
      )}
      {/* 
    <div>
      <h1>My Posts</h1>
      {posts.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
              <button onClick={() => handleEdit(post._id)}>Edit</button>
          <button onClick={() => handleDelete(post._id)}>Delete</button>
        </div>
      ))}
    </div> */}
    </div>
  );
};

export default UserPosts;
