export interface UpdatePostProps {
  title: string;
  description: string;
  content: string;
  keywords: string;
  slug: string;
  post_slug: string;
  category: string;
  status: string;
  thumbnail_name?: string | null;
  thumbnail_size?: string | null;
  thumbnail_type?: string | null;
  thumbnail_key?: string | null;
}

export default async function updatePost(props: UpdatePostProps) {
  try {
    const res = await fetch('/api/blog/post/update', {
      method: 'PUT',
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
