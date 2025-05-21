import Newsletter from '../ui/home/hero/newsletter';
import styles from './about.module.scss';

const BlogPage = () => {
  return (
    <section className={styles.aboutPage}>
      <div className={styles.title}>
        <h1>About BlogHive</h1>
        <h3>
          Welcome to BlogHive — your buzzing hub for thoughts, stories, and
          ideas.
        </h3>
      </div>

      <div className={styles.aboutContent}>
        <p>
          BlogHive is a modern blogging platform built for creators who want a
          clean, fast, and engaging experience—whether you're writing, reading,
          or building your audience.
        </p>
        <p>
          Our goal is simple: empower individuals to share their voice with the
          world through a beautifully crafted, full-featured blog experience.
        </p>

        <h2>Why BlogHive?</h2>
        <ul>
          <li>
            <b>📝 User-Friendly</b> Create, edit, and manage your blog posts
            with ease.
          </li>
          <li>
            <b>🚀 Performance-Driven</b> Built with Next.js for speed, SEO, and
            scalability.
          </li>
          <li>
            <b>🚀 Performance-Driven</b> Built with Next.js for speed, SEO, and
            scalability.
          </li>
          <li>
            <b>🔒 Secure & Private</b> Authentication and user data are handled
            with best practices.
          </li>
          <li>
            <b>🖼️ Rich Media Support</b> Share photos, format content, and
            express more than just words.
          </li>
          <li>
            <b>🧠 Smart Features</b> Likes, comments, tags, and search help your
            content go further.
          </li>
        </ul>

        <h2>Built for Writers. Designed for Readers.</h2>
        <p>
          Whether you're a casual blogger or a dedicated writer, BlogHive helps
          you focus on what matters—your content.
        </p>
      </div>

      <Newsletter />
    </section>
  );
};

export default BlogPage;
