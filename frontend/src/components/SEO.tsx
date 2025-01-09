import Head from 'next/head';

export interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  href?: string;
  robots?: string;
  author?: string;
  publisher?: string;
  image?: string;
  twitterHandle?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  href = '',
  robots = 'index, follow',
  author = '',
  publisher = '',
  image = '',
  twitterHandle = '',
}: SEOProps) {
  return (
    <Head>
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={href} />
      <meta name="robots" content={robots} />
      <meta name="author" content={author} />
      <meta name="publisher" content={publisher} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Social Media Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={href} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1370" />
      <meta property="og:image:height" content="849" />
      <meta property="og:image:alt" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter meta Tags */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:player:width" content="1280" />
      <meta name="twitter:player:height" content="720" />
    </Head>
  );
}

SEO.defaultProps = {
  href: '',
  robots: 'index, follow',
  author: '',
  publisher: '',
  image: '',
  twitterHandle: '',
};
