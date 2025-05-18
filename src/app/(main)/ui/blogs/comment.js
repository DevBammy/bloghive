import authorImage from '../../../../../public/avatar3.jpg';
import Image from 'next/image';
import { IoCloseCircle } from 'react-icons/io5';
import styles from './card.module.scss';

const Comment = ({
  commenting,
  comment,
  showComment,
  setShowComment,
  handleSubmitComment,
  newComment,
  setNewComment,
}) => {
  return (
    <div className={styles.comment}>
      <h3>All Comment</h3>

      {commenting ? (
        <p>Loading comments...</p>
      ) : comment.length > 0 ? (
        comment.map((com, i) => (
          <div key={i} className={styles.commentItem}>
            <div className={styles.commentAuthor}>
              <Image
                src={com.user?.image || authorImage}
                alt={com.user?.name}
                width={40}
                height={40}
              />
              <strong>{com.user?.name || 'Anonymous'}</strong>
            </div>
            <p>{com.content}</p>
          </div>
        ))
      ) : (
        <p>This post has no comment(s) yet.</p>
      )}

      <div
        className={
          showComment
            ? `${styles.commentBox} ${styles.show}`
            : styles.commentBox
        }
      >
        <IoCloseCircle
          className={styles.icon}
          onClick={() => setShowComment((prev) => !prev)}
        />
        <form className={styles.commentContent} onSubmit={handleSubmitComment}>
          <textarea
            name="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="type your comment here"
          ></textarea>
          <button className={`btn ${styles.btn}`} type="submit">
            {commenting ? 'Commenting' : 'comment'}
          </button>
        </form>
      </div>
      <button
        className={`btn ${styles.btn}`}
        onClick={() => setShowComment((prev) => !prev)}
      >
        Add new comment
      </button>
    </div>
  );
};

export default Comment;
