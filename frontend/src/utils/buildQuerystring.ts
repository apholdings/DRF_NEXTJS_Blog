export default function buildQueryString(params: Record<string, any>) {
  const queryString: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // For query parameters that accept multiple values
      value.forEach((v) => {
        queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
      });
    } else if (value !== undefined) {
      // For single value query parameters
      queryString.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  });

  return queryString.join('&');
}
