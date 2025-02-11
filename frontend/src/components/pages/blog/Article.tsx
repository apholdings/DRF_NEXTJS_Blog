import { IPost } from '@/interfaces/blog/IPost';

export default function Article({ post, content }: { post: IPost | null; content: string }) {
  return (
    <article className="prose dark:prose-invert">
      <p className="dark:text-dark-txt mt-6 text-xl leading-8">{post?.description}</p>
      <div className="prose dark:prose-invert dark:text-dark-txt-secondary mt-10 max-w-2xl text-lg">
        {content}
      </div>
    </article>
  );
}
