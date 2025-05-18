'use client';

import { PiHeartStraightFill, PiHeartStraightLight } from 'react-icons/pi';
import styles from './card.module.scss';

const LikeButton = ({ handleToggleLike, liked, liking, likesCount }) => {
  return (
    <button className="btn" onClick={handleToggleLike}>
      {liked ? <PiHeartStraightFill color="red" /> : <PiHeartStraightLight />}
      <span>{liking ? 'loading...' : likesCount || 0}</span>
    </button>
  );
};

export default LikeButton;
