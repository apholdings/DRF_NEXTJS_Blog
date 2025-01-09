import Button from '@/components/Button';
import EditImage from '@/components/forms/EditImage';
import EditKeywords from '@/components/forms/EditKeywords';
import EditRichText from '@/components/forms/EditRichText';
import EditSelect from '@/components/forms/EditSelect';
import EditSlug from '@/components/forms/EditSlug';
import EditText from '@/components/forms/EditText';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import { ICategoryList } from '@/interfaces/blog/ICategory';
import { RootState } from '@/redux/reducers';
import createPost, { CreatePostProps } from '@/utils/api/blog/post/create';
import { fetchS3SignedURL } from '@/utils/api/s3/FetchPresignedUrl';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';

interface ComponentProps {
  categories: ICategoryList[];
  loadingCategories: boolean;
}

export default function CreatePost({ categories, loadingCategories }: ComponentProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [status, setStatus] = useState<string>('draft');

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [percentage, setPercentage] = useState<number>(0);

  const onLoadThumbnail = (newImage: any) => {
    if (newImage !== thumbnail) {
      setThumbnail(newImage);
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const isEmpty = (str: string) => {
    // Strip all HTML tags and trim whitespace
    const cleanedContent = str.replace(/<[^>]*>/g, '').trim();
    return cleanedContent === '';
  };

  const handleSaveThumbnail = async () => {
    if (!thumbnail.file) {
      ToastError('No file selected for upload');
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

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      const createPostData: CreatePostProps = {
        title,
        description,
        content,
        keywords,
        slug,
        category,
        status,
      };

      if (thumbnailResult?.status === 'success') {
        createPostData.thumbnail_name = thumbnailResult.thumbnail_name;
        createPostData.thumbnail_size = thumbnailResult.thumbnail_size;
        createPostData.thumbnail_type = thumbnailResult.thumbnail_type;
        createPostData.thumbnail_key = thumbnailResult.thumbnail_key;
      }

      const res = await createPost(createPostData);

      if (res.status === 201) {
        ToastSuccess(res.results);
        setTitle('');
        setDescription('');
        setContent('');
        setKeywords('');
        setSlug('');
        setCategory('');
        setStatus('draft');
        if (thumbnailResult) {
          setThumbnail(null);
        }
        return true;
      }
      ToastError(res.error);
      return false;
    } catch (err) {
      ToastError('Error creating post');
    } finally {
      setLoading(false);
    }
    return false;
  };

  return (
    <form onSubmit={handleOnSubmit} className="space-y-4">
      <EditText title="Title" data={title} setData={setTitle} showMaxTextLength required />
      <EditText
        title="Description"
        data={description}
        showMaxTextLength
        maxTextLength={200}
        setData={setDescription}
        required
      />
      <EditRichText title="Content" maxTextLength={2400} data={content} setData={setContent} />
      {/* <CreateHeadings /> */}
      <EditImage
        title="Thumbnail"
        data={thumbnail}
        setData={setThumbnail}
        onLoad={onLoadThumbnail}
        percentage={percentage}
      />
      <EditKeywords title="Keywords" data={keywords} setData={setKeywords} required />
      <EditSlug title="Slug" data={slug} setData={setSlug} required />
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
      <Button type="submit">{loading ? <LoadingMoon /> : 'Create Post'}</Button>
    </form>
  );
}
