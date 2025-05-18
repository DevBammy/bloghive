import Image from 'next/image';
import styles from './elements.module.scss';
import loadingImage from '../../../../../public/loading.png';

const Loading = () => {
  return (
    <section className={styles.loading}>
      <div className={styles.img}>
        <Image src={loadingImage} alt="loading image" priority />
      </div>
      <h2>Loading...</h2>
    </section>
  );
};

export default Loading;
