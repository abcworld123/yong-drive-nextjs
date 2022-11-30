import Checkbox from '@mui/material/Checkbox';
import { useCallback, useEffect, useState } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import shallow from 'zustand/shallow';
import { useCheckBoxStore } from 'hooks/stores';
import styles from 'styles/Layouts.module.scss';
import { FolderIcon } from 'svg/icons';
import type { FolderProps } from 'types/props';

export default function Folder({ name, click, intoFolder }: FolderProps) {
  const [chkSet, chkAll, refresh] = useCheckBoxStore(state => [state.chkSet, state.chkAll, state.refresh], shallow);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    click(name, checked);
  }, [name, checked]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setChecked(chkAll);
  }, [chkAll, refresh]);

  const toggleCheckBox = useCallback(() => {
    setChecked(checked => !checked);
  }, []);

  const longPress = useCallback(() => {
    toggleCheckBox();
  }, []);

  const longPressBind = useLongPress(!chkSet.size ? longPress : null, {
    threshold: 400,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.TOUCH,
  });

  const onclick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>, name: string) => {
    if (e.target instanceof HTMLInputElement) return;  // isCheckBox
    if (!chkSet.size) {
      intoFolder(name);
    } else {
      toggleCheckBox();
    }
  }, [chkSet]);

  return (
    <div>
      <div className={`${styles.objectIcon} ${checked ? styles.checkedObjectIcon : ''} cursor-pointer`} onClick={e => onclick(e, name)}>
        <Checkbox className={styles.checkbox} checked={checked} onClick={toggleCheckBox} />
        <div {...longPressBind()} className="grid place-items-center">
          <FolderIcon />
        </div>
      </div>
      <div title={name.slice(0, -1)} className={`${styles.objectName} mt-5`}>
        {name.slice(0, -1)}
      </div>
    </div>
  );
}
