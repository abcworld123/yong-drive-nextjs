import { Checkbox } from '@mui/material';
import { useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useHomeStore } from 'hooks/stores';

export default function AllCheckBox() {
  const objects = useHomeStore(state => state.objects);
  const [chkSet, chkAll] = useCheckBoxStore(state => [state.chkSet, state.chkAll], shallow);

  const toggleChkAll = useCallback(() => {
    useCheckBoxStore.setState(state => ({ chkAll: !state.chkAll }));
  }, []);

  useEffect(() => {
    if (chkSet.size === 0) {
      useCheckBoxStore.setState({ chkAll: false });
    }
  }, [chkSet]);

  return (
    <Button onClick={toggleChkAll}>
      <Checkbox
        checked={chkAll}
        disabled={!objects.length}
        disableRipple
      />
    </Button>
  );
}
