import { useCallback } from 'react';
import { Button } from 'components/buttons';
import { useCheckBoxStore, useClipboardStore, useHomeStore } from 'hooks/stores';
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
    <Button
      icon={<CutIcon />}
      text="잘라내기"
      className={chkSet.size ? '' : 'hidden'}
      onClick={cut}
      responsive
    />
  );
}
