import { useEffect, useRef } from 'react';
import type { DownloadFormdata } from 'types/apis';

export default function Downloader({ formdata }: { formdata: DownloadFormdata }) {
  const downloader = useRef<HTMLFormElement>();
  const { bucket, path, filenames } = formdata || {};

  useEffect(() => {
    if (formdata) downloader.current.submit();
  }, [formdata]);

  return (
    <>{
      formdata ? (
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
