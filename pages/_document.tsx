import { Html, Head, Main, NextScript, DocumentProps } from 'next/document';

export default function Document(docProps: DocumentProps) {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
        <footer></footer>
      </body>
    </Html>
  );
}
