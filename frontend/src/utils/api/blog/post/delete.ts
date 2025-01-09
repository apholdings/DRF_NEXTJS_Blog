interface ComponentProps {
  slug: string;
}

export default async function deletePost({ slug }: ComponentProps) {
  try {
    const res = await fetch(`/api/blog/post/delete/?slug=${slug}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
  } catch (e) {
    return null;
  }

  return null;
}
