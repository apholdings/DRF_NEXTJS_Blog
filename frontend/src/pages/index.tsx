import SEO, { SEOProps } from '@/components/SEO';
import Layout from '@/hocs/Layout';

export default function Home() {
  const SEOList: SEOProps = {
    title: 'Home page',
    description: 'Description here',
    keywords: 'test1, test2, test3',
    href: `${process.env.DOMAIN}/`,
    robots: 'all',
    author: `${process.env.DOMAIN_NAME}`,
    publisher: `${process.env.DOMAIN_NAME}`,
    image: '/assets/img/thumbnails/cursos_online.png',
    twitterHandle: '@boomslag_',
  };

  return (
    <div>
      <SEO {...SEOList} />
      Home page
    </div>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
