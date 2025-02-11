import EditImage from '@/components/forms/EditImage';
import EditKeywords from '@/components/forms/EditKeywords';
import EditRichText from '@/components/forms/EditRichText';
import EditSelect from '@/components/forms/EditSelect';
import EditSlug from '@/components/forms/EditSlug';
import EditText from '@/components/forms/EditText';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import { IPost } from '@/interfaces/blog/IPost';
import { RootState } from '@/redux/reducers';
import fetchPost from '@/utils/api/blog/post/get';
import updatePost, { UpdatePostProps } from '@/utils/api/blog/post/update';
import { fetchS3SignedURL } from '@/utils/api/s3/FetchPresignedUrl';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface ComponentProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  categories: ICategoryList[];
  loadingCategories: boolean;
}

export default function EditPostModal({
  open,
  setOpen,
  slug,
  categories,
  loadingCategories,
}: ComponentProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPost | null>(null);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [postSlug, setPostSlug] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<string>('draft');

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);

  const onLoadThumbnail = (newImage: any) => {
    if (newImage !== thumbnail) {
      setThumbnail(newImage);
    }
  };

  const getPost = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetchPost({ slug });
      if (res.status === 200) {
        setPost(res.results);
      }
    } catch (err) {
      ToastError(`Error fetching post information for ${slug}`);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (open) {
      getPost();
    }
  }, [getPost, open]);

  useEffect(() => {
    if (post) {
      setTitle(post?.title || '');
      setDescription(post?.description || '');
      setContent(post?.content || '');
      setPostSlug(post?.slug || '');
      setKeywords(post?.keywords || '');
      setCategory(post?.category?.slug || '');
      setThumbnail(post?.thumbnail?.url || '');
      setStatus(post?.status);
    }
  }, [post]);

  const handleSaveThumbnail = async () => {
    if (!thumbnail.file) {
      return null;
    }

    const { file } = thumbnail;
    const { name: thumbnailTitle, size, type } = file;
    const sanitizedTitle = thumbnailTitle.replace(/\s/g, '_');
    const fileKey = `media/blog/posts/${user?.username}/${slug}/${sanitizedTitle}`;

    try {
      const presignedUrl = await fetchS3SignedURL({
        bucket: `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}`,
        key: fileKey,
      });

      const uploadResponse = await axios.put(presignedUrl, file, {
        headers: {
          'Content-Type': file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const perc = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
            setPercentage(perc);
          }
        },
      });

      if (uploadResponse.status === 200) {
        setPercentage(0);
        return {
          thumbnail_name: sanitizedTitle,
          thumbnail_size: size,
          thumbnail_type: type,
          thumbnail_key: fileKey,
          status: 'success',
        };
      }
    } catch (err) {
      ToastError('Error uploading image to S3');
    }

    return {
      thumbnail_name: null,
      thumbnail_size: null,
      thumbnail_type: null,
      thumbnail_key: null,
      status: 'failed',
    };
  };

  const isEmpty = (str: string) => {
    // Strip all HTML tags and trim whitespace
    const cleanedContent = str.replace(/<[^>]*>/g, '').trim();
    return cleanedContent === '';
  };

  const handleOnSubmit = async () => {
    if (isEmpty(content)) {
      ToastError('Post must have content');
      return null;
    }

    try {
      setLoading(true);

      let thumbnailResult = null;

      if (thumbnail) {
        thumbnailResult = await handleSaveThumbnail();
      }

      const createPostData: UpdatePostProps = {
        title,
        description,
        content,
        keywords,
        slug: postSlug,
        post_slug: slug,
        category,
        status,
      };

      if (thumbnailResult?.status === 'success') {
        createPostData.thumbnail_name = thumbnailResult.thumbnail_name;
        createPostData.thumbnail_size = thumbnailResult.thumbnail_size;
        createPostData.thumbnail_type = thumbnailResult.thumbnail_type;
        createPostData.thumbnail_key = thumbnailResult.thumbnail_key;
      }

      const res = await updatePost(createPostData);

      if (res.status === 200) {
        setPost(res.results);
        ToastSuccess('Post edited successfully. Changes will be processed in a few minutes');
        // setOpen(false);
        return true;
      }
      ToastError(res.error);
      return false;
    } catch (err) {
      ToastError('Error updating post');
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-full transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-4xl sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                  Edit post: TEST
                </DialogTitle>
              </div>
              <div className="mt-3 space-y-4">
                <EditText data={title} setData={setTitle} title="Title" />
                <EditText data={description} setData={setDescription} title="Description" />
                <EditImage
                  title="Thumbnail"
                  data={thumbnail}
                  setData={setThumbnail}
                  onLoad={onLoadThumbnail}
                  percentage={percentage}
                />
                <EditRichText
                  data={content}
                  setData={setContent}
                  title="Content"
                  maxTextLength={2400}
                />
                <EditSlug data={postSlug} setData={setPostSlug} title="Slug" />
                <EditKeywords data={keywords} setData={setKeywords} title="Keywords" />
                <EditSelect
                  title="Category"
                  data={category}
                  setData={setCategory}
                  disabled={loadingCategories}
                  options={categories?.map((cat) => cat.slug)}
                  placeholder="Select a category"
                  required
                />
                <EditSelect
                  title="Status"
                  data={status}
                  setData={setStatus}
                  options={['draft', 'published']}
                  placeholder="Select status"
                  required
                />
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                onClick={() => handleOnSubmit()}
                disabled={loading}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {loading ? <LoadingMoon /> : 'Save changes'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
