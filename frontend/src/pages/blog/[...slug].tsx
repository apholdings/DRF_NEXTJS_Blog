import React, { useMemo } from 'react';
import parse from 'html-react-parser';
import Header from '@/components/pages/blog/Header';
import Layout from '@/hocs/Layout';
import { IPost } from '@/interfaces/blog/IPost';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import TableOfContents from '@/components/pages/blog/TableOfContents';
import { IHeading } from '@/interfaces/blog/IHeading';
import Article from '@/components/pages/blog/Article';
import usePosts from '@/hooks/usePosts';
import PostsList from '@/components/pages/blog/PostsList';
import EmailInput from '@/components/cta/EmailInput';
import SEO, { SEOProps } from '@/components/SEO';
import Like from '@/components/pages/blog/Like';
import Share from '@/components/pages/blog/Share';

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { slug } = context.params as { slug: string };

  const { req } = context;
  const accessToken = req.cookies.access;

  let post: IPost | null = null;

  try {
    const headers: Record<string, string> = {
      Accept: 'application/json',
      'API-Key': `${process.env.BACKEND_API_KEY}`,
    };

    if (accessToken) {
      headers.Authorization = `JWT ${accessToken}`;
    }

    const apiRes = await fetch(`${process.env.API_URL}/api/blog/post/?slug=${slug}`, {
      headers,
    });

    const data = await apiRes.json();
    if (apiRes.status === 200) {
      post = data.results;
    }
  } catch (e) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
};

export default function Page({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const SEOList: SEOProps = {
    title: `${post?.title}`,
    description: `${post?.description}`,
    keywords: `${post?.keywords}`,
    href: `${process.env.DOMAIN}/blog/${post?.slug}`,
    robots: 'all',
    author: `${post?.user?.username}`,
    publisher: `${process.env.DOMAIN_NAME}`,
    image: `${post?.thumbnail ? post?.thumbnail?.url : '/assets/img/thumbnails/cursos_online.png'}`,
    twitterHandle: '@boomslag_',
  };

  const parsedContent = parse(post?.content || '');
  const addIdsToHeadings = (content: any, _headings: IHeading[]) => {
    // Ensure content is an array before calling map
    if (!Array.isArray(content)) return content;

    return content.map((element: any) => {
      // Check if the element is a heading React element (h1, h2, h3, h4, h5, h6)
      if (element.props && /^h[1-6]$/.test(element.type)) {
        // Extract the text content of the heading
        const headingText = React.Children.toArray(element.props.children).reduce(
          // @ts-ignore
          (text, child) => text + (child.props ? child.props.children : child),
          '',
        );

        // Find the matching slug for this heading text
        const matchingHeading = _headings.find((h: IHeading) => h.title === headingText);

        // If a match is found, recreate the heading element with an 'id' prop
        if (matchingHeading) {
          return React.cloneElement(element, {
            ...element.props,
            id: matchingHeading.slug,
          });
        }
      }
      // Return the element unchanged if it's not a heading or no match is found
      return element;
    });
  };

  const modifiedContent = addIdsToHeadings(parsedContent, post?.headings);

  const categorySlug = useMemo(() => [post?.category?.slug], [post?.category?.slug]);

  const { posts, loading } = usePosts({ categories: categorySlug });

  const filteredPosts = useMemo(
    () => posts?.filter((relatedPost) => relatedPost.slug !== post?.slug),
    [posts, post?.slug],
  );

  return (
    <div>
      <SEO {...SEOList} />
      <Header post={post} />

      <div className="block lg:relative lg:flex lg:flex-wrap">
        {post?.headings?.length > 0 && (
          <div className="w-full md:top-0 lg:sticky lg:h-full lg:w-1/4">
            <TableOfContents headings={post?.headings} />
          </div>
        )}
        <div className="lg:w-2/2 mx-auto w-full max-w-3xl px-8 leading-7 text-gray-700 lg:px-2 xl:w-1/2">
          <div className="flex items-center space-x-2">
            <Like post={post} />
            <Share post={post} />
          </div>
          <Article post={post} content={modifiedContent} />
        </div>
        <div className="hidden w-full md:top-0 xl:sticky xl:flex xl:h-full xl:w-1/4">
          <EmailInput />
        </div>
      </div>
      <PostsList title="Related posts" posts={filteredPosts} loading={loading} />
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};
