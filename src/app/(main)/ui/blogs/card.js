import Link from 'next/link';
import Image from 'next/image';
import blogImage from '../../../../../public/blog1.jpg';
import styles from './card.module.scss';

const Card = () => (
  <div className={styles.card}>
    <Link href="/blogs/1" className={styles.card__image}>
      <Image src={blogImage} alt="Blog Post" width={50} height={50} />
    </Link>
    <div className={styles.card__content}>
      <h3>Blog Title</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        consequuntur tenetur officiis, repudiandae ullam facilis accusamus
        corrupti cupiditate numquam.
      </p>

      <div className={styles.cardBottom}>
        <div className={styles.card__info}>
          <Link href="null" className={styles.card__author}>
            <Image
              src={'/avatar3.jpg'}
              alt="Blog Post"
              width={40}
              height={40}
            />
            <p>Bamidele.dev</p>
          </Link>
        </div>
        <p>07/05/2025</p>
      </div>
    </div>
  </div>
);

export default Card;
