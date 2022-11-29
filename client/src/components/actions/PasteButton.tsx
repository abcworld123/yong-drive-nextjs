import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useClipboardStore, useHomeStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { PasteIcon } from 'svg/icons';
import { alertError } from 'utils/alerts';
import api from 'utils/api';
import { toastSuccess } from 'utils/toasts';
import type { ResDefault } from 'types/apis';

export default function PasteButton() {
  const reload = useHomeStore(state => state.reload);
  const mode = useClipboardStore(state => state.mode);

  const paste = useCallback(async () => {
    const from = useClipboardStore.getState();
    const pathTo = useHomeStore.getState().path;
    const body = {
      ...from,
      pathTo,
    };
    try {
      const msg = mode === 'copy' ? '복사' : '이동';
      const { data } = await api.post<ResDefault>('/s3/object/paste', body);
      if (!data.success) throw new Error(`${msg} 오류`);
      toastSuccess(`${msg} 완료!`);
      reload();
    } catch (err) {
      alertError(err.message);
      console.error(err);
    }
    useClipboardStore.setState({
      bucket: '',
      pathFrom: '',
      objects: [],
      mode: null,
    });
  }, [mode, reload]);

  return (
    <>
      <Button
        className={mode ? '' : 'hidden'}
        startIcon={<PasteIcon />}
        onClick={paste}
      >
        <span className={styles.buttonText}>붙여넣기</span>
      </Button>
    </>
  );
}
