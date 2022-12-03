import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import { Button } from 'components/buttons';
import { Downloader } from 'components/utils';
import { useCheckBoxStore, useHomeStore } from 'hooks/stores';
import { DownloadIcon } from 'svg/icons';
import type { DownloadBody } from 'types/apis';

export default function DownloadButton() {
  const [bucket, path] = useHomeStore(state => [state.bucket, state.path], shallow);
  const chkSet = useCheckBoxStore(state => state.chkSet);

  const [downloadBody, setDownloadBody] = useState<DownloadBody>(null);

  // download
  const downloadObject = useCallback(async () => {
    const filenames = [...chkSet];
    const body: DownloadBody = {
      bucket: bucket,
      path: path,
      filenames: filenames,
    };
    try {
      setDownloadBody(body);
      // todo iframe post 500 error?
    } catch (err) {
      console.error(err);
    }
  }, [bucket, chkSet, path]);

  return (
    <>
      <Button
        icon={<DownloadIcon />}
        text="다운로드"
        className={chkSet.size ? '' : 'hidden'}
        onClick={downloadObject}
        responsive
      />
      <Downloader body={downloadBody} />
    </>
  );
}
