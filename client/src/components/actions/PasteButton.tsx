import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useClipboardStore } from 'hooks/stores';
import { PasteIcon } from 'svg/icons';

export default function PasteButton() {
  const clipboard = useClipboardStore(state => state.mode);

  const paste = useCallback(() => {

  }, []);

  return (
    <>
      <Button
        className={clipboard ? '' : 'hidden'}
        startIcon={<PasteIcon size={24} fill="#444" />}  // todo paste icon
        onClick={paste}
      >
      붙여넣기
      </Button>
    </>
  );
}
