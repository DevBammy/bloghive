import Blogs from './ui/home/blogs/blogs';
import Hero from './ui/home/hero/hero';
import Newsletter from './ui/home/hero/newsletter';

export default function Home() {
  return (
    <section>
      <Hero />
      <Blogs />
      <Newsletter />
    </section>
  );
}
