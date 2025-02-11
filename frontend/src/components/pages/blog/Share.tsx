import { IPost } from '@/interfaces/blog/IPost';
import { FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon } from 'next-share';

interface ComponentProps {
  post: IPost;
}

export default function Share({ post }: ComponentProps) {
  return (
    <div className="flex items-center space-x-1">
      <FacebookShareButton url={`${process.env.DOMAIN}/blog/${post?.slug}`} quote={post?.title}>
        <FacebookIcon size={28} round />
      </FacebookShareButton>

      <RedditShareButton url={`${process.env.DOMAIN}/blog/${post?.slug}`} title={post?.title}>
        <RedditIcon size={28} round />
      </RedditShareButton>
    </div>
  );
}
