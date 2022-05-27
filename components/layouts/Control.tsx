import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useCallback, useContext, useRef, useState } from 'react';
import Button from 'components/buttons/MainButton';
import { HomeContext } from 'pages/[bucket]/[[...path]]';
import DeleteIcon from 'svg/DeleteIcon';
import DownloadIcon from 'svg/DownloadIcon';
import UploadIcon from 'svg/UploadIcon';
import { alertError, alertSuccess, alertWarn } from 'utils/alerts';
import type { DeleteFormdata, ResDefault, UploadParams } from 'types/apis';
import type { ControlFC, ControlProps } from 'types/reactTypes';

export default function Control({ chkSet }: ControlProps): ControlFC {
  const { bucket, path, objects, chkAll, reload, toggleChkAll } = useContext(HomeContext);
  const [progVal, setProgVal] = useState(0);
  const inputFile = useRef<HTMLInputElement>(null);

  const uploadObject = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    const params: UploadParams = {
      bucket: bucket,
      path: path,
      filename: file.name,
    };
    try {
      const { data } = await axios.post<ResDefault>('/api/s3/object/upload', file, {
        params,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: ProgressEvent) => {
          setProgVal(progressEvent.loaded / progressEvent.total);
        },
      });
      if (!data.success) throw new Error('업로드 오류');
      alertSuccess('업로드 성공!');
      reload();
    } catch (err) {
      alertError(err.message);
      console.error(err);
    } finally {
      inputFile.current.value = inputFile.current.defaultValue;
    }
  }, [bucket, reload, path]);

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
      alertSuccess('삭제 성공!');
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
        onClick={() => {}}
      >
        다운로드
      </Button>

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
      />
      <progress value={progVal} />
    </div>
  );
}
