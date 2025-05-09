import styles from './hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.text}>
        <h3>Featured*</h3>
        <h1>This is our very first blog post</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam, nemo
          officia mollitia libero, impedit id animi minus consequatur ipsum,
          veritatis commodi eligendi. Quasi in odio ad dignissimos at voluptatem
          repellat.
        </p>
      </div>
    </section>
  );
};

export default Hero;
