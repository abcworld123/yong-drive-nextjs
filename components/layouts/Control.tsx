import { Checkbox } from '@mui/material';
import axios from 'axios';
import { useCallback, useContext, useRef, useState } from 'react';
import DeleteIcon from '@svg/DeleteIcon';
import DownloadIcon from '@svg/DownloadIcon';
import UploadIcon from '@svg/UploadIcon';
import Button from 'components/buttons/MainButton';
import { HomeContext } from 'pages/[...path]';
import { UploadParams } from 'types/apis';
import { alertError, alertSuccess } from 'utils/alerts';
import type { ControlFC, ControlProps } from 'types/reactTypes';

export default function Control({ chkSet }: ControlProps): ControlFC {
  const { bucket, asPath, objects, chkAll, reload, toggleChkAll } = useContext(HomeContext);
  const [progVal, setProgVal] = useState(0);
  const inputFile = useRef<HTMLInputElement>(null);

  const upload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files[0];
    const params: UploadParams = {
      Bucket: bucket,
      Key: file.name,
    };
    try {
      const { data } = await axios.post('/api/s3-bucket/uploadobject', file, {
        params,
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent: any) => {
          setProgVal(progressEvent.loaded / progressEvent.total);
        },
      });
      if (!data.success) throw new Error('업로드 오류');
      alertSuccess('업로드 성공!');
      reload(asPath);
    } catch (err) {
      alertError(err.message);
      console.error(err);
    } finally {
      inputFile.current.value = inputFile.current.defaultValue;
    }
  }, [bucket, reload, asPath]);

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
        onClick={() => inputFile.current.click()}
      >
        다운로드
      </Button>

      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<DeleteIcon size={24} fill="#444" />}
        onClick={() => inputFile.current.click()}
      >
        삭제
      </Button>

      <input
        type="file"
        className="hidden"
        ref={inputFile}
        onChange={upload}
      />
      <progress value={progVal} />
    </div>
  );
}
