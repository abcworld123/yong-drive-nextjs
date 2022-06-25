import axios from 'axios';
import { Circle } from 'rc-progress';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { Dropdown } from 'components/buttons';
import { useHomeStore } from 'hooks/stores';
import { UploadIcon } from 'svg/icons';
import { alertError } from 'utils/alerts';
import { toastSuccess } from 'utils/toasts';
import type { ResDefault, UploadParams } from 'types/apis';
import type { DropdownItem } from 'types/props';

export default function UploadButton() {
  const [bucket, path, reload] = useHomeStore(state => [state.bucket, state.path, state.reload], shallow);
  const [isUploading, setIsUploading] = useState(false);
  const [progVal, setProgVal] = useState(0);
  const inputFile = useRef<HTMLInputElement>(null);
  const inputFolder = useRef<HTMLInputElement>(null);

  // upload
  const upload = useCallback(async (files: File[]) => {
    setIsUploading(true);
    const totalSize = files.reduce((a, b) => a + b.size, 0);
    let curSize = 0;
    try {
      for (const file of files) {
        let filepath: string = file['path'] || file.webkitRelativePath || file.name;
        if (filepath[0] === '/') filepath = filepath.slice(1);
        const params: UploadParams = {
          bucket: bucket,
          path: path,
          filename: filepath,
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

  const menuItems: DropdownItem[] = useMemo(() => [
    { name: '파일 업로드', action: () => inputFile.current.click() },
    { name: '폴더 업로드', action: () => inputFolder.current.click() },
  ], []);

  useEffect(() => {
    useHomeStore.setState({ uploadObject: upload });
  }, [upload]);

  return (
    <>
      <Dropdown
        startIcon={<UploadIcon size={24} fill="#444" />}
        buttonName="올리기"
        items={menuItems}
      />
      <input
        type="file"
        className="hidden"
        ref={inputFile}
        onChange={(e) => upload([...e.target.files])}
        multiple
      />
      <input
        type="file"
        className="hidden"
        ref={inputFolder}
        onChange={(e) => upload([...e.target.files])}
        {...{ 'webkitdirectory': '' }}
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
