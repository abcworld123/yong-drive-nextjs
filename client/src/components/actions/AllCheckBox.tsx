import { useCallback, useEffect } from 'react';
import shallow from 'zustand/shallow';
import { Button, CheckBox } from 'components/buttons';
import { useCheckBoxStore, useHomeStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';

export default function AllCheckBox() {
  const objects = useHomeStore(state => state.objects);
  const [chkSet, chkAll] = useCheckBoxStore(state => [state.chkSet, state.chkAll], shallow);

  const toggleChkAll = useCallback((target: EventTarget) => {
    console.log(target.constructor.name);
    if (target instanceof HTMLInputElement) return;
    useCheckBoxStore.setState(state => ({ chkAll: !state.chkAll }));
  }, []);

  useEffect(() => {
    if (chkSet.size === 0) {
      useCheckBoxStore.setState({ chkAll: false });
    }
  }, [chkSet]);

  return (
    <Button
      onClick={e => toggleChkAll(e.target)}
      className={styles.buttonAllCheckBox}
      icon={<CheckBox checked={chkAll} />}
      disabled={!objects.length}
    />
  );
}
