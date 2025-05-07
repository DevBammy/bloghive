import Link from 'next/link';
import Image from 'next/image';
import styles from './card.module.scss';

const Card = () => (
  <div className={styles.card}>
    <Link href="" className={styles.card__image}>
      <img src="/blog1.jpg" alt="Blog Post" width={50} height={50} />
    </Link>
    <div className={styles.card__content}>
      <h3>Blog Title</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        consequuntur tenetur officiis, repudiandae ullam facilis accusamus
        corrupti cupiditate numquam.
      </p>

      <div href="" className={styles.cardBottom}>
        <div href="" className={styles.card__info}>
          <Link href="" className={styles.card__author}>
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
