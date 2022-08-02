import { useEffect, useRef } from 'react';
import type { DownloaderProps } from 'types/props';

export default function Downloader({ body }: DownloaderProps) {
  const downloader = useRef<HTMLFormElement>();
  const { bucket, path, filenames } = body || {};

  useEffect(() => {
    if (body) downloader.current.submit();
  }, [body]);

  return (
    <>{
      body ? (
        <>
          <iframe className="hidden" name="iframe" />
          <form className="hidden" ref={downloader} action="/api/s3/object/download" method="POST" target="iframe">
            <input type="hidden" name="bucket" value={bucket} />
            <input type="hidden" name="path" value={path} />
            <input type="hidden" name="filenames" value={JSON.stringify(filenames)} />
          </form>
        </>
      ) : <></>
    }</>
  );
}
