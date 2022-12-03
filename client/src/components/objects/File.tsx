import { memo, useCallback } from 'react';
import { useLongPress, LongPressDetectEvents } from 'use-long-press';
import { CheckBox } from 'components/buttons';
import styles from 'styles/Layouts.module.scss';
import { FIleIcon } from 'svg/icons';
import type { FileProps } from 'types/props';

function File({ name, check, checked, checkMode, size }: FileProps) {
  const toggleCheck = useCallback(() => {
    check(name);
  }, []);

  const longPressBind = useLongPress(!checkMode ? toggleCheck : null, {
    threshold: 400,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.TOUCH,
  });

  const clickFile = useCallback((target: EventTarget) => {
    if (target instanceof HTMLLabelElement || target instanceof HTMLInputElement) return;  // isCheckBox
    if (checkMode) {
      toggleCheck();
    }
  }, [checkMode]);

  return (
    <div>
      <div className={`${styles.objectIcon} ${checked ? styles.checkedObjectIcon : ''} cursor-pointer`} onClick={e => clickFile(e.target)}>
        <CheckBox checked={checked} toggleCheck={toggleCheck} />
        <div {...longPressBind()} className="grid place-items-center">
          <FIleIcon />
        </div>
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

export default memo(File);
