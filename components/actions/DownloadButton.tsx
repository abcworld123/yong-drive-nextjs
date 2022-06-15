import { useCallback, useState } from 'react';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import Downloader from 'components/utils/Downloader';
import { useHomeStore } from 'hooks/stores';
import { DownloadIcon } from 'svg/icons';
import { DownloadFormdata } from 'types/apis';

export default function DownloadButton() {
  const [bucket, chkSet, path] = useHomeStore(state => [state.bucket, state.chkSet, state.path], shallow);
  const [downloadFormdata, setDownloadFormdata] = useState<DownloadFormdata>(null);

  // download
  const downloadObject = useCallback(async () => {
    const filenames = [...chkSet];
    const formdata: DownloadFormdata = {
      bucket: bucket,
      path: path,
      filenames: filenames,
    };
    try {
      setDownloadFormdata(formdata);
      // todo iframe post 500 error?
    } catch (err) {
      console.error(err);
    }
  }, [bucket, chkSet, path]);

  return (
    <>
      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<DownloadIcon size={24} fill="#444" />}
        onClick={downloadObject}
      >
      다운로드
      </Button>
      <Downloader formdata={downloadFormdata} />
    </>
  );
}
