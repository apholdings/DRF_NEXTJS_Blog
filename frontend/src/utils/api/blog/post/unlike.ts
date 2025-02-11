export interface LikePostProps {
  slug: string;
}

export default async function unLikePost(props: LikePostProps) {
  try {
    const res = await fetch(`/api/blog/post/unlike?slug=${props.slug}`, {
      method: 'DELETE',
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
