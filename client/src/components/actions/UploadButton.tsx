import { useCallback, useEffect, useMemo, useRef } from 'react';
import shallow from 'zustand/shallow';
import { Dropdown } from 'components/buttons';
import { useHomeStore, useUploadStore } from 'hooks/stores';
import { UploadIcon } from 'svg/icons';
import { alertError } from 'utils/alerts';
import api from 'utils/api';
import { toastSuccess } from 'utils/toasts';
import type { AxiosProgressEvent } from 'axios';
import type { ResDefault, UploadParams } from 'types/apis';
import type { DropdownItem } from 'types/props';

export default function UploadButton() {
  const [bucket, path, reload] = useHomeStore(state => [state.bucket, state.path, state.reload], shallow);
  const [setIsUploading, setProgVal] = useUploadStore(state => [state.setIsUploading, state.setProgVal], shallow);
  const inputFile = useRef<HTMLInputElement>(null);
  const inputFolder = useRef<HTMLInputElement>(null);

  // upload
  const upload = useCallback(async (files: File[]) => {
    if (!files.length) return;
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
        const { data } = await api.post<ResDefault>('/s3/object/upload', file, {
          params,
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
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
    useUploadStore.setState({ uploadObject: upload });
  }, [upload]);

  return (
    <>
      <Dropdown
        startIcon={<UploadIcon />}
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
    </>
  );
}
