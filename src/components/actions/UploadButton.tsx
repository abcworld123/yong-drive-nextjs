import axios from 'axios';
import { Circle } from 'rc-progress';
import { useCallback, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import { useHomeStore } from 'hooks/stores';
import { UploadIcon } from 'svg/icons';
import { alertError } from 'utils/alerts';
import { toastSuccess } from 'utils/toasts';
import type { ResDefault, UploadParams } from 'types/apis';

export default function UploadButton() {
  const [bucket, path, reload] = useHomeStore(state => [state.bucket, state.path, state.reload], shallow);
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

  return (
    <>
      <Button
        startIcon={<UploadIcon size={24} fill="#444" />}
        onClick={() => inputFile.current.click()}
      >
        올리기
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
    </>
  );
}
