import { useCallback } from 'react';
import { Button } from 'components/buttons';
import { useCheckBoxStore, useClipboardStore, useHomeStore } from 'hooks/stores';
import { CopyIcon } from 'svg/icons';

export default function CopyButton() {
  const chkSet = useCheckBoxStore(state => state.chkSet);

  const copy = useCallback(() => {
    const { bucket, path } = useHomeStore.getState();
    useCheckBoxStore.setState({ chkAll: false, chkSet: new Set() });
    useClipboardStore.setState({
      bucket,
      pathFrom: path,
      objects: [...chkSet],
      mode: 'copy',
    });
  }, [chkSet]);

  return (
    <Button
      icon={<CopyIcon />}
      text="복사"
      className={chkSet.size ? '' : 'hidden'}
      onClick={copy}
      responsive
    />
  );
}
