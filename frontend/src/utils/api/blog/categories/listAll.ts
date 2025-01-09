export default async function fetchAllCategories() {
  try {
    const res = await fetch(`/api/blog/categories/list_all`);
    const data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}
