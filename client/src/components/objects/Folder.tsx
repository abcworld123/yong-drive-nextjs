import Checkbox from '@mui/material/Checkbox';
import { memo, useCallback } from 'react';
import { LongPressDetectEvents, useLongPress } from 'use-long-press';
import styles from 'styles/Layouts.module.scss';
import { FolderIcon } from 'svg/icons';
import type { FolderProps } from 'types/props';

function Folder({ name, check, checked, checkMode, intoFolder }: FolderProps) {
  const toggleCheck = useCallback(() => {
    check(name);
  }, []);

  const longPressBind = useLongPress(!checkMode ? toggleCheck : null, {
    threshold: 400,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.TOUCH,
  });

  const clickFolder = useCallback((target: EventTarget, name: string) => {
    if (target instanceof HTMLInputElement) return;  // isCheckBox
    if (!checkMode) {
      intoFolder(name);
    } else {
      toggleCheck();
    }
  }, [checkMode]);

  return (
    <div>
      <div className={`${styles.objectIcon} ${checked ? styles.checkedObjectIcon : ''} cursor-pointer`} onClick={e => clickFolder(e.target, name)}>
        <Checkbox className={styles.checkbox} checked={checked} onClick={toggleCheck} />
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

export default memo(Folder);
