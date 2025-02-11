export interface LikePostProps {
  slug: string;
}

export default async function likePost(props: LikePostProps) {
  try {
    const res = await fetch('/api/blog/post/like', {
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
