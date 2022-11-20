import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useClipboardStore, useHomeStore } from 'hooks/stores';
import { CopyIcon } from 'svg/icons';

export default function CopyButton() {
  const chkSet = useCheckBoxStore(state => state.chkSet);

  const copy = useCallback(() => {
    const { bucket, path } = useHomeStore.getState();
    useCheckBoxStore.setState({ chkAll: false, refresh: {} });
    useClipboardStore.setState({
      bucket,
      pathFrom: path,
      objects: [...chkSet],
      mode: 'copy',
    });
  }, [chkSet]);

  return (
    <>
      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<CopyIcon size={24} fill="#444" />}
        onClick={copy}
      >
      복사
      </Button>
    </>
  );
}
