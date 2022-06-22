import { Checkbox } from '@mui/material';
import shallow from 'zustand/shallow';
import { MainButton as Button } from 'components/buttons';
import { useHomeStore } from 'hooks/stores';

export default function AllCheckBox() {
  const [chkAll, toggleChkAll, objects] = useHomeStore(state => [state.chkAll, state.toggleChkAll, state.objects], shallow);

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
