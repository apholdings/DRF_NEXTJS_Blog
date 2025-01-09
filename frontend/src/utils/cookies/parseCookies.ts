function parseCookies(cookieHeader: string): Record<string, string> {
  return cookieHeader.split(';').reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    },
    {} as Record<string, string>,
  );
}

export default parseCookies;
