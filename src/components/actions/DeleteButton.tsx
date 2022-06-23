import axios from 'axios';
import { useCallback } from 'react';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import { useHomeStore } from 'hooks/stores';
import { DeleteIcon } from 'svg/icons';
import { alertConfirm, alertError } from 'utils/alerts';
import { toastSuccess } from 'utils/toasts';
import type { DeleteFormdata, ResDefault } from 'types/apis';

export default function DeleteButton() {
  const [bucket, chkSet, path, reload] = useHomeStore(state => [state.bucket, state.chkSet, state.path, state.reload], shallow);

  // delete
  const deleteObject = useCallback(async () => {
    const isConfirmed = (await alertConfirm(
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
    <Button
      className={chkSet.size ? '' : 'hidden'}
      startIcon={<DeleteIcon size={24} fill="#444" />}
      onClick={deleteObject}
    >
        삭제
    </Button>
  );
}
