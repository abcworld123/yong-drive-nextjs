import { Checkbox } from '@mui/material';
import axios from 'axios';
import { Circle } from 'rc-progress';
import { useCallback, useRef, useState } from 'react';
import Button from 'components/buttons/MainButton';
import Downloader from 'components/utils/Downloader';
import useHomeStore from 'hooks/store/useHomeStore';
import DeleteIcon from 'svg/DeleteIcon';
import DownloadIcon from 'svg/DownloadIcon';
import UploadIcon from 'svg/UploadIcon';
import { alertError, alertWarn } from 'utils/alerts';
import { toastSuccess } from 'utils/toasts';
import type { DeleteFormdata, DownloadFormdata, ResDefault, UploadParams } from 'types/apis';
import type { ControlProps } from 'types/props';

export default function Control({ chkSet }: ControlProps) {
  const { bucket, path, chkAll, toggleChkAll, reload, objects } = useHomeStore();
  const [downloadFormdata, setDownloadFormdata] = useState<DownloadFormdata>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progVal, setProgVal] = useState(0);
  const inputFile = useRef<HTMLInputElement>(null);

  // upload
  const uploadObject = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    const files = [...e.currentTarget.files];
    const totalSize = files.reduce((a, b) => a + b.size, 0);
    let curSize = 0;
    try {
      for (const file of files) {
        const params: UploadParams = {
          bucket: bucket,
          path: path,
          filename: file.name,
        };
        const { data } = await axios.post<ResDefault>('/api/s3/object/upload', file, {
          params,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent: ProgressEvent) => {
            setProgVal(Math.ceil(((curSize + progressEvent.loaded) * 100 / totalSize)));
          },
        });
        if (!data.success) throw new Error('업로드 오류');
        curSize += file.size;
      }
      toastSuccess('업로드 완료!');
      setIsUploading(false);
      reload();
    } catch (err) {
      alertError(err.message);
      console.error(err);
    } finally {
      inputFile.current.value = inputFile.current.defaultValue;
    }
  }, [bucket, reload, path]);

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

  // delete
  const deleteObject = useCallback(async () => {
    const isConfirmed = (await alertWarn(
      '정말 삭제하시겠습니까?',
      '삭제된 항목은 복구할 수 없습니다.',
    )).isConfirmed;
    if (!isConfirmed) return;
    const formdata: DeleteFormdata = {
      bucket: bucket,
      path: path,
      objects: [...chkSet],
    };
    try {
      const { data } = await axios.post<ResDefault>('/api/s3/object/delete', formdata);
      if (!data.success) throw new Error('삭제 오류');
      toastSuccess('삭제 완료!');
      reload();
    } catch (err) {
      alertError(err.message);
      console.error(err);
    }
  }, [bucket, chkSet, path, reload]);

  return (
    <div className="flex gap-5">
      <Button onClick={toggleChkAll}>
        <Checkbox
          checked={chkAll}
          disabled={!objects.length}
          disableRipple
        />
      </Button>

      <Button
        startIcon={<UploadIcon size={24} fill="#444" />}
        onClick={() => inputFile.current.click()}
      >
        올리기
      </Button>

      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<DownloadIcon size={24} fill="#444" />}
        onClick={downloadObject}
      >
        다운로드
      </Button>
      <Downloader formdata={downloadFormdata} />

      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<DeleteIcon size={24} fill="#444" />}
        onClick={deleteObject}
      >
        삭제
      </Button>

      <input
        type="file"
        className="hidden"
        ref={inputFile}
        onChange={uploadObject}
        multiple
      />

      <Circle
        className={`w-12 ${isUploading ? '' : 'hidden'}`}
        percent={progVal}
        strokeWidth={8}
        trailWidth={2}
        strokeColor="#3fc3ee"
        trailColor="#ccc"
      />
    </div>
  );
}
