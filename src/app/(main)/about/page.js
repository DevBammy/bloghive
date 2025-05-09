import Newsletter from '../ui/home/hero/newsletter';
import styles from './about.module.scss';

const BlogPage = () => {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.title}>
        <h1>About BlogHive</h1>
        <p>
          Discover insights, inspiration, and expert advice on our engaging
          blog.
        </p>
      </div>

      <p>
        At BlogHive, we believe in the power of voices—diverse, authentic, and
        unapologetically real. We are a dynamic blogging platform built to
        empower storytellers, thought leaders, and everyday thinkers to share
        ideas that matter.
      </p>

      <h2>Our Mission</h2>

      <p>
        To democratize content creation by providing a clean, flexible, and
        distraction-free space where anyone can write, publish, and connect with
        an audience that values substance over noise.
      </p>

      <h2>What We Offer</h2>
      <ol>
        <li>
          Powerful Writing Tools - A seamless editor that lets your ideas flow
          without friction.
        </li>
        <li>
          Community-Centric Experience - Follow your favorite writers, engage in
          meaningful discussions, and discover content that aligns with your
          passions.
        </li>
        <li>
          Built for Growth - Whether you're blogging as a hobby or building a
          personal brand, BlogHive helps you grow your voice and visibility.
        </li>
        <li>
          Secure & Scalable - With reliable hosting, fast performance, and
          robust security, you focus on writing—we handle the rest.
        </li>
      </ol>

      <h2>Why "BlogHive"?</h2>
      <p>
        Because we're a buzzing ecosystem of ideas. Like a hive, every
        contributor adds value to the collective—creating a space that's always
        evolving, always alive.
      </p>

      <h2>For Writers. For Readers. For the Future.</h2>
      <p>
        BlogHive isn't just another blogging tool—it's a movement. A platform
        where the next generation of digital writers build legacies, spark
        conversations, and shape narratives that move the world forward. Welcome
        to the Hive. Let your voice be heard.
      </p>

      <Newsletter />
    </section>
  );
};

export default BlogPage;
