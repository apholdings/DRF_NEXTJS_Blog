import { ToastError } from '@/components/toast/alerts';
import { IPost } from '@/interfaces/blog/IPost';
import likePost, { LikePostProps } from '@/utils/api/blog/post/like';
import unLikePost from '@/utils/api/blog/post/unlike';
import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ComponentProps {
  post: IPost;
}

export default function Like({ post }: ComponentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [postLiked, setPostLiked] = useState<boolean>(post?.has_liked);
  const [postLikes, setPostLikes] = useState<number>(post?.likes_count);

  const handleLike = async () => {
    try {
      setLoading(true);

      const likePostData: LikePostProps = {
        slug: post?.slug,
      };

      if (!postLiked) {
        const res = await likePost(likePostData);
        if (res.status === 200) {
          setPostLiked(true);
          setPostLikes(postLikes + 1);
        }
      } else {
        const res = await unLikePost(likePostData);
        if (res.status === 200) {
          setPostLiked(false);
          setPostLikes(postLikes - 1);
        }
      }
    } catch (e) {
      ToastError('Error liking post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={handleLike}
        disabled={loading}
        className={`flex items-center space-x-1 hover:text-blue-700 ${postLiked ? 'text-blue-700 hover:text-blue-900' : 'text-gray-700 hover:text-gray-900'}`}
      >
        <HandThumbUpIcon className="h-5 w-5" />
      </button>
      <div>{postLikes}</div>
    </div>
  );
}
