import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useCheckBoxStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { FIleIcon } from 'svg/icons';
import type { FileProps } from 'types/props';

export default function File({ name, size, click }: FileProps) {
  const [chkAll, refresh] = useCheckBoxStore(state => [state.chkAll, state.refresh], shallow);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    click(name, checked);
  }, [name, checked]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChecked(chkAll);
  }, [chkAll, refresh]);

  return (
    <div>
      <div className={`${styles.objectIcon} ${checked ? styles.checkedObjectIcon : ''}`}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{ position: 'absolute' }} checked={checked} onClick={() => setChecked(!checked)} />
        <FIleIcon />
      </div>
      <div title={name} className={`${styles.objectName} mt-5`}>
        {name}
      </div>
      <div title={size} className={`${styles.objectName} mt-2 text-neutral-400`}>
        {size}
      </div>
    </div>
  );
}
