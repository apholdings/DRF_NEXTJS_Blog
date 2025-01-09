import { IPost } from '@/interfaces/blog/IPost';

export default function Article({ post, content }: { post: IPost | null; content: string }) {
  return (
    <article className="prose">
      <p className="dark:text-dark-txt mt-6 text-xl leading-8">{post?.description}</p>
      <h1 className="dark:text-dark-accent mt-8 text-3xl tracking-tight text-blue-500 sm:text-4xl">
        {post?.title}
      </h1>
      <div className="prose dark:text-dark-txt-secondary mt-10 max-w-2xl text-lg">{content}</div>
    </article>
  );
}
