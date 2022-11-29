import styles from 'styles/Layouts.module.scss';
import { BucketIcon } from 'svg/icons';
import type { BucketProps } from 'types/props';

export default function Bucket({ name, dblClick }: BucketProps) {
  return (
    <div>
      <div className={styles.objectIcon} onDoubleClick={() => dblClick(name)}>
        <div className="grid place-items-center">
          <BucketIcon />
        </div>
      </div>
      <div title={name} className={`${styles.objectName} mt-5`}>
        {name}
      </div>
    </div>
  );
}
