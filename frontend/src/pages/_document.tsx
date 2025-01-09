import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';
import { resetServerContext } from 'react-beautiful-dnd';

export default function Document() {
  useEffect(() => {
    resetServerContext();
  }, []);

  return (
    <Html lang="en">
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
