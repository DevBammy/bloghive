import Image from 'next/image';
import blogImage from '../../../../../public/blog30.jpg';
import authorImage from '../../../../../public/avatar3.jpg';
import { FaXTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa6';
import styles from '../blogs.module.scss';
import Link from 'next/link';
import Card from '../../ui/blogs/card';
import Newsletter from '../../ui/home/hero/newsletter';

const BlogDetailsPage = () => {
  return (
    <section className={styles.blogDetails}>
      <div className={styles.title}>
        <div className={styles.left}>
          <h1>
            At BlogHive, we believe in the power of voices—diverse, authentic,
            and unapologetically real.
          </h1>
          <p>this is a leading text from the blog</p>
        </div>
        <div className={styles.right}>
          <div className={styles.metadata}>
            <span>DATE</span>
            <p>Mar 29, 2025</p>
          </div>
          <div className={styles.metadata}>
            <span>CATEGORY</span>
            <p>EDUCATION</p>
          </div>
          <div className={styles.metadata}>
            <span>READING TIME</span>
            <p>20 MINS</p>
          </div>
        </div>
      </div>

      <div className={styles.blogImage}>
        <Image src={blogImage} alt="blog post image" />
      </div>

      <div className={styles.blogBody}>
        <div className={styles.row}>
          <div className={styles.col}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus modi quas facilis est excepturi, vel dolor quo iusto,
              culpa distinctio quis et consequuntur dolore! Quisquam inventore
              eum ipsam quos unde soluta voluptatum nulla optio fugiat quis?
              Voluptates quos odit eius quia harum? Voluptatibus ullam
              accusantium saepe consequatur tenetur quia harum fugiat vero
              dolorum magni blanditiis, magnam ut accusamus adipisci ratione
              possimus ipsam corporis necessitatibus, explicabo modi molestias?
              Temporibus asperiores rerum distinctio, veniam accusamus, aliquid
              est blanditiis dignissimos sint voluptatibus ab, illum eos ut.
              Facere, ut expedita? Perspiciatis mollitia corporis consequatur
              laborum ad. Blanditiis explicabo mollitia doloribus laudantium eos
              possimus eligendi harum. Repellat vel numquam dolorem quis dolore
              reiciendis architecto, iusto fugiat nisi nostrum alias odit esse
              animi, tempora magnam perspiciatis? Blanditiis praesentium autem
              itaque a, eveniet eius pariatur ipsam ad eaque laudantium
              provident omnis, sint natus fuga? Possimus alias quam incidunt ut
              excepturi magnam a dolor sint odit quas vero exercitationem aut,
              similique, impedit officiis magni commodi velit! Quo ipsam
              pariatur dolor rem accusamus sint fugiat id similique nostrum
              explicabo ullam impedit eius cumque consequuntur, nemo officia
              minus totam asperiores tempore sit atque debitis nihil omnis
              doloribus. Sunt ex corporis vel accusamus aliquid impedit culpa
              magnam ipsum natus! Optio, expedita?
            </p>
          </div>

          <div className={styles.col}>
            <h3>AUTHOR</h3>

            <Link href="null" className={styles.authorImage}>
              <Image src={authorImage} alt="author images" />
            </Link>
            <h2>Emmanuel Bamidele</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quisquam
              iure aliquid sunt?
            </p>

            <h3>SHARE</h3>

            <div className={styles.socialShare}>
              <Link href="null">
                <FaXTwitter />
              </Link>
              <Link href="null">
                <FaFacebook />
              </Link>
              <Link href="null">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.relatedNewsTitle}>
        <h1>related news</h1>
        <Link href="/blogs" className="btn_white btn">
          SEE ALL
        </Link>
      </div>

      <div className={styles.relatedNews}>
        <Card />
        <Card />
        <Card />
      </div>

      <Newsletter />
    </section>
  );
};

export default BlogDetailsPage;
