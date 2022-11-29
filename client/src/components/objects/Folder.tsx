import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useCheckBoxStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { FolderIcon } from 'svg/icons';
import type { FolderProps } from 'types/props';

export default function Folder({ name, click, dblClick }: FolderProps) {
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
      <div className={`${styles.objectIcon} ${checked ? styles.checkedObjectIcon : ''}`} onDoubleClick={() => dblClick(name)}>
        <Checkbox className="-translate-x-14 -translate-y-14" sx={{ position: 'absolute' }} checked={checked} onClick={() => setChecked(!checked)} />
        <FolderIcon />
      </div>
      <div className="text-sm">
        <div className="text-center mt-5">
          {name.slice(0, -1)}
        </div>
      </div>
    </div>
  );
}
