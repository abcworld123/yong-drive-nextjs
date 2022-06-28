import { Checkbox } from '@mui/material';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import { useCheckBoxStore, useHomeStore } from 'hooks/stores';

export default function AllCheckBox() {
  const objects = useHomeStore(state => state.objects);
  const [chkAll, toggleChkAll] = useCheckBoxStore(state => [state.chkAll, state.toggleChkAll], shallow);

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
