'use client';

import { useState } from 'react';
import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(post.likes.includes(currentUserId));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleToggleLike = async () => {
    try {
      const res = await fetch(`/api/posts/${post._id}`, {
        method: 'PATCH',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Failed to toggle like');

      const data = await res.json();
      setLiked(data.liked);
      setLikesCount(data.likesCount);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleToggleLike}>
      {liked ? (
        <PiHeartStraightLight className={styles.icon} />
      ) : (
        <PiHeartStraightFill className={styles.icon} />
      )}{' '}
      ({likesCount})
    </button>
  );
};

export default LikeButton;
