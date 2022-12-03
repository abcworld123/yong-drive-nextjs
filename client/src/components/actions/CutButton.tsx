import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useClipboardStore, useHomeStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { CutIcon } from 'svg/icons';

export default function CutButton() {
  const chkSet = useCheckBoxStore(state => state.chkSet);

  const cut = useCallback(() => {
    const { bucket, path } = useHomeStore.getState();
    useCheckBoxStore.setState({ chkAll: false, chkSet: new Set() });
    useClipboardStore.setState({
      bucket,
      pathFrom: path,
      objects: [...chkSet],
      mode: 'cut',
    });
  }, [chkSet]);

  return (
    <>
      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<CutIcon />}
        onClick={cut}
      >
        <span className={styles.buttonText}>잘라내기</span>
      </Button>
    </>
  );
}
