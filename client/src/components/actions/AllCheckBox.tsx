import { Checkbox } from '@mui/material';
import { useCallback } from 'react';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useHomeStore } from 'hooks/stores';

export default function AllCheckBox() {
  const objects = useHomeStore(state => state.objects);
  const chkAll = useCheckBoxStore(state => state.chkAll);

  const toggleChkAll = useCallback(() => {
    useCheckBoxStore.setState(state => ({ chkAll: !state.chkAll }));
  }, []);

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
