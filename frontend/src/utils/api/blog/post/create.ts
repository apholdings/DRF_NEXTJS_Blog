export interface CreatePostProps {
  title: string;
  description: string;
  content: string;
  keywords: string;
  slug: string;
  category: string;
  status: string;
  thumbnail_name?: string | null;
  thumbnail_size?: string | null;
  thumbnail_type?: string | null;
  thumbnail_key?: string | null;
}

export default async function createPost(props: CreatePostProps) {
  try {
    const res = await fetch('/api/blog/post/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
  return null;
}
