import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useClipboardStore } from 'hooks/stores';
import { CutIcon } from 'svg/icons';

export default function CutButton() {
  const chkSet = useCheckBoxStore(state => state.chkSet);
  const clipboard = useClipboardStore(state => state.mode);

  const paste = useCallback(() => {

  }, []);

  return (
    <>
      <Button
        className={chkSet.size ? '' : 'hidden'}
        startIcon={<CutIcon size={24} fill="#444" />}  // todo paste icon
        onClick={paste}
      >
      잘라내기
      </Button>
    </>
  );
}
